[Udemy link](https://www.udemy.com/course/network-level-cyber-attack-detection/learn/lecture/23760924#content)

## Intro to SCAPY

Need to know attack methodologies and protocol details. Attackers use packet decodes to detect vulnerabilities.

We detect attack patterns and create rules in Suricata to detect them.

Rules are generic WRT to tools: snort, Suricata, etc. The logic is the same.

Payloads are the most important element for creating rules.  

### Workfflow

#### Set up listener

Open separate CLI window, then enter:

        `> sudo su`
        '> nc -lvp TCP_PORT_NUMBER'

#### scapy python script to create/send packet

          `from scapy.all import *
          payload1="shellbackdoor"
          payload2="exploit"
          payload1="anomaluseragent"
          payload1="method"
          payload1="maliciousdomain"
          junk="\x42"*11
          nop="\x90"*34
          alternate="\x42"*11
          datapayload = junk + payload1 + nop + payload2 + 4 * "C" + payload4 + 20 * "D" + payload3 + nop + payload5
          pack = IP(dst='172.0.0.1')/TCP(dport=TCP_PORT)/datapayload
          send(pack)
          sr1(pack)
          print("payload has been sent successfully to port 1337\n")`

#### Display payloads in scapy

scapy session:

  `> scapy`
  `> ls(IP)`show IP payload
  `> ls(TCP)`

#### Inspect in Wireshark

Filter as follows:
  `ip.addr--172.0.0.1 and tcp.port==1337`

In this example, payload decodes as FTP b/c the source port is unspecified in python script (default i.e. 20)

Most of the interesting stuff happens in the app payload portion of the packets

## Simulate malicious DNS request with SCAPY

You'e a malware analyst, the org is receiving emails from phishing domains.

Solution: write a Suricata (or other tool) rule that detects these domains

1. Write a scapy script that sends a packet with a set of phishing domains in the DNS payload
2. Open up CLI window, enter
    `sudo su`
    `nc -lvp 1337`
    `fakedns` sends user-friendly DNS responses
3. Open Wireshark, filter on `dns.qry.type`

### Example scapy script

        `#!/usr/bin/env python
        from scapy.all import *
        malicious_domain_list = ["c2c-server.local", "password-facebook.local", "gmail.com4-users-reset.account.local", "isp-payment-fake.com"]
        for domain in malicious_domain_list:
            query=IP(dst="172.16.8.53")/UDP(dport=53)/DNS(rd=1,qd=DNSQR(qname=domain))
            sr1(query,verbose=0)`

## Simulate ransomware traffic with scapy and analyze with remnux

1. Run `inetsim` in CLI

2. Open another CLI, run a set of commands like this:

      `import urllib
      #http suricata rule example, not real malware, just simulation of traffic
      req = urllib.request.Request(url="http://172.16.8.57/cryptkey.php=12345&WALLETID=223", headers={'User-Agent':' Mozilla Hackers'})
      handler = urllib.request.urlopen(req)`

3. Ctrl-C `inetsim` then look in the log for the URI string of interest, in this case `cryptkey.php=12345&WALLETID=223`

4. Can also find the string of interest in Wireshark

## Snort installation

### Snort and Suricata keywords

A rule has the following format:

`action` - What to do if a packet meets the rule - `alert`, `log`, `pass`, `reject` (Suricata only)
`header` - protocol, IP, port, and direction
`options` - `offset`, `content`, `distance`, `nocase`, `within`

Example:

`alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (msg:"COMMUNITY SQL-INJECTION Microsoft BizTalk Server 2002 rawdocdata.asp"; flow:to_server,established; uricontent:"/rawdocdata.asp?"; nocase; pcre:"/rawdocdata.asp\x3F[^\r\n]*exec/Ui"; classtype:web-application-attack; reference:bugtraq,7470; reference:cve,2003-0118; reference:url,www.microsoft.com/technet/security/bulletin/MS03-016.mspx; sid:100000106; rev:1;)`

Can also use hex values for `content`

## Detect phishing with suricata

config file is at `/etc/suricata/suricata.yaml`
rule files are in `/etc/suricata/rules`

passive rules => simply notify admin if the rule detects something
active rules => take action such as block the traffic or impose rate limiting

Example shows how to detect a PayPal phishing attempt:

`alert dns any any .> any 53 (msg:"Paypal phishing has been detected"}; dns query; content:"paypal.com"; no case ; isdataat:1, relative [sid:10000001; rev:`;`)`

## Detect ransomware traffic

### Examine packets

7ev3n.pcap - contains ransomware traffic

suspicious packet looks like this:

`Frame 254: 273 bytes on wire (2184 bits), 273 bytes captured (2184 bits)

Hypertext Transfer Protocol
    GET /JLSnmfrktnvlrkebtreetbe/plate.php?RIGHTS=admin&WIN=7%207601&WALLET=1Po7jmasw77QDEZrZFSH86xihbMLQUWi9v&ID=75938604283482821121121123232865311727&UI=888 HTTP/1.1\r\n
        [Expert Info (Chat/Sequence): GET /JLSnmfrktnvlrkebtreetbe/plate.php?RIGHTS=admin&WIN=7%207601&WALLET=1Po7jmasw77QDEZrZFSH86xihbMLQUWi9v&ID=75938604283482821121121123232865311727&UI=888 HTTP/1.1\r\n]
        Request Method: GET
        Request URI: /JLSnmfrktnvlrkebtreetbe/plate.php?RIGHTS=admin&WIN=7%207601&WALLET=1Po7jmasw77QDEZrZFSH86xihbMLQUWi9v&ID=75938604283482821121121123232865311727&UI=888
        Request Version: HTTP/1.1
    User-Agent: Internet Explorer\r\n
    Host: 5.154.191.80\r\n
    \r\n
    [Full request URI: http://5.154.191.80/JLSnmfrktnvlrkebtreetbe/plate.php?RIGHTS=admin&WIN=7%207601&WALLET=1Po7jmasw77QDEZrZFSH86xihbMLQUWi9v&ID=75938604283482821121121123232865311727&UI=888]
    [HTTP request 1/2]
    [Response in frame: 256]
    [Next request in frame: 259]
`

TCP payload includes GET request that includes `RIGHTS=admin` and `WALLET=<wallet_id>`
The payload for this packet has `User-Agent : Internet Explorer\r\n` -- We can see this is fakedns

### Write Suricata rule

Now we can write a Suricata rule:

`alert http any any -> $EXTERNAL_NET 80 (msg:"Ransomeware has been detected"; flow:established,to_server; content:"GET"; http_method:"php?RIGHTS=; http_uri:"&WiN="; distance=0; content:"WALLET"; http_uri; distance:0; content:"&ID"; http_uri; distance:0; content:"Internet|20|Explorer"; http_user_agent; depth:17; isdataat:!1,relative; sid:10000003; rev:1;  )`

`content:"Internet|20|Explorer"; http_user_agent; depth:17; isdataat:!1,relative` => If there's no version # or other info after `Internet Explorer` for the `User-Agent` value, flag this as ransomware

### Run Suricata on pcap file

`> suricata -r /root/Desktop/udemy-nw-detection/suricata/pcaps/7ev3n.pcap -c /etc/suricata/suricata.yaml -k none -l /root/Desktop/udemy-nw-detection/suricata/logs/ransom_sig`

### Examine log output

`> cd /root/Desktop/udemy-nw-detection/suricata/logs/ransom_sig`
`> cat tls.log`   => we see  `ON=cert.002.blockchain.info`
`> cat http.log` => can see bad `User-Agent : Internet Explorer`
`> cat fast.log` => can see `Ransomware has been detected` output

## SSH tunnel detection

### Simple shell script

`print "usage is .start.sh <pcapfile> <logoutputfolder>"
suricata -r $1 -c /etc/suricata/suricata.yaml -k none -l $2`

### Suricata alerts

`alert ssh $HOME_NET any <> any [53, 80, 443] (msg:"Possible SSH Tunnel"; content: "OpenSSH";  sid:1000004; rev:1;)`
`alert ssh any <> any !22 (msg:"Policy Violation: SSH Tunnel"; content: "OpenSSH"; nocase; sid:1000004; rev:1;)`

### Log output

Look for `"Possible SSH Tunnel"` and "Policy Violation: SSH Tunnel"

## ICMP tunnel detection

ICMP packets have a standard size. Can find ICMP tunnels by looking for packets with non-standard data.learn

In Wireshark, search for
- `icmp && data.len > 63 = 3 / 6 * 16 = 99` basically any length > 98
- `icmp && data.len > 63 and icmp contains net`

### Suricata alerts
- `alert icmp any any -> any any (msg:"Possible ICMP Shell or Tunnel"; dsize:>63; classtype:icmp-event;  sid:1000006; rev:1;)`
- `alert icmp any any -> any any (msg:"Possible ICMP RCE or Tunnel"; content: "net user"; nocase;  classtype:icmp-event;  sid:1000007; rev:1;)`

## DNS tunnel detection

### Suricata alerts

`# DNS Tunnel
alert dns any any -> any any (msg: "DNS TUNNEL OPENED"; dns_query; content: "dnscat"; side 20026; rev:1;)
alert dns any any -> any any (msg: "BEACONING DNS REQUEST TUNNEL OR MALWARE"; threshold: type both, track by_dst, count 40, seconds 60;; side 20027; rev:1;)`



## Zero-day exploit detection

Use Wireshark to search for  buffer overflows in TCP traffic: `tcp contains "\x41\x41"`
Select packet, then *Follow* > *TCP stream*. The junk bytes all appear as hex 41 (capital A)
Hackers commonly use `\x41` and `\x90` to overflow the stack

### Suricata fule

`# REMOTE EXPLOIT SHELLCODE
alert smb any any -> any any (msg: "SMB EXPLOIT SHELLCODE DETECTED  junk bytes"; content: "| 90 90 90 90 90 90 90 90 90 90"; side 20028; rev:1;)
alert smb any any -> any any (msg: "SMB EXPLOIT SHELLCODE DETECTED nops bytes";  content: "| 41 41 41 41 41 41 41 41 41 41"; side 20028; rev:1;)
alert tcp any any -> $HOME_NET 21 (msg "PCMAN 2.0 SERVER EXPLOIT HAS BEEN DETECTED"; content "|41 41 41 41|"; offset:0; depth:4; content:"|13 44 87 7c|"; distance:2004; within:4; content "|90 90 90 90|"; distance:0; within:10; side:10000014: rev:1)`
