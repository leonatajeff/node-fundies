# Networking Basics

## Media Access Control (MAC) Addresses
- **Definition**: A unique address assigned to a networking card. This identifier ensures devices communicate properly over a network.  
- **Format**: MAC addresses are 48 bits long and represented in hexadecimal, e.g., `f1:31:87:f1:5b:3c`
- **Role in Networks**:
  - Networking cards (NICs) have MAC addresses and connect to a **switch** via Ethernet cables for internet connectivity.
  - Important in packet switching within a LAN (Local Area Network).

---

## Understanding Packets vs Frames

### **Packet**  
A unit of data sent over a network. Packets include:  
- **Source MAC address**: The origin of the packet.  
- **Destination MAC address**: The target device for the packet.

### **Frame**  
Frames are packets encapsulated at the Data Link Layer (explained further below). They include MAC addresses for switching within a network.

---

## Routers and How the Internet Works
- Routers sit above switches and connect networks at the **IP Layer**.  
- Every router has an **IP address**, allowing it to make inter-network communication decisions.  

---

## Networking Layers  

Networking layers govern *how data moves* between computers. The layers below follow the **OSI Model**:

### **Application Layer**
- This is the highest layer and is familiar to programmers.  
  - Examples: **Node.js**, **HTTP**, **FTP**, **SSH**—where software interacts with network functions below. These services rely on the **Transport Layer**.  
- Focuses on "what the data is" (e.g., an HTTP request or FTP transfers).

---

### **Transport Layer**
- Handles **end-to-end communication** between devices.
- Splits data into **segments** and ensures proper delivery using protocols like **TCP** and **UDP**.

#### **TCP: Transmission Control Protocol**
- Ensures reliability with mechanisms like retransmission for lost data.  
- Essential in secure communication (e.g., passwords, bank transactions).  

##### Process:
- **Three-way handshake**:
  - A -> B: "Ready to send"  
  - B -> A: "Acknowledged, ready to receive"  
- Ensures *trustworthiness* of every transmitted bit.  

##### **TCP Headers** (added to each segment):
1. **Source Port** (16 bits): Where the packet originated.  
2. **Destination Port** (16 bits): Where the packet is going.  
3. **Sequence Number** (32 bits): Tracks packet position.  
4. **Acknowledgment Number** (32 bits): Confirms receipt.
5. Optional:
   - **Checksum** (16 bits): Ensures data integrity.  
   - **Window Size**: Synchronizes data flow effectively.  
   - Flags: For flow control, resets, etc.

---

#### **UDP: User Datagram Protocol**
- **Fast but less reliable** than TCP. Ideal for streaming videos, calls, and online gaming due to lower overhead and faster delivery.  
- Doesn't guarantee all packets will arrive but focuses on speed instead.  

##### **UDP Headers**:
1. **Source Port** (16 bits)  
2. **Destination Port** (16 bits)  
3. **Segment Length** (16 bits)  
4. **Checksum** (16 bits): Basic integrity.  

---

### **Network Layer**
- **IP Addresses**: Logical addresses used for routing packets between networks.  
- Responsible for **path determination** in inter-network communications.  

---

### **Data Link Layer**  
- Encloses packets into **frames** using the MAC address.  
- **Switches** at this layer handle decisions based on MAC addresses.  

---

### **Physical Layer**
- Handles **binary transmission** using cables, signals, and network specs.
- Bits travel over physical media following standards (e.g., Ethernet).

---

# Network Scenario  

- **`127.0.0.1` (Loopback Address)**: Represents the local machine (localhost).  
  - Often used for testing services running on the same computer.

---

# Wireshark Notes  

### Filters for Debugging  
Wireshark is a tool to inspect and analyze network traffic. 

Key filters include:  
ip.addr == 127.0.0.1
tcp.port == 3099
ip.addr == 127.0.0.1 && tcp.port == 3099

- Combine conditions for targeted inspection.