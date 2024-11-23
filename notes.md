## HTTP protocol
An http protocol is a foundation to communicate between client and server on the web. 

__Key features__

_Stateless_ - Each request is independent of other. 

_Layered_ - Operates over TCP/IP and can include security layers(HTTPS)

_Text based_ - human readable headers for request and response

## Steps of HTTP cycle
1. **Client makes a request** - request includes headers(contains metadata, headers, optionally request body), request method(GET, POST, PUT, DELETE)
2. **DNS Lookup** - teh domain name is translated into a corresponding IP address
3. **Connection establishment** - A TCP connection is established between client and server. 
4. **Exchange of data** - Once the connection is established, the data is exchanged. 
5. **Closure of connection** - Once data is exchanged, the connection is closed. 

## Drawbacks of HTTP Protocol
1. **Connection Overhead** - Every request needs to establish a new connection and terminate it. 
2. **Header overhead** - every request and response includes headers which can be large, loosing bandwidth
3. **Pooling for real time updates** - client needs to repeatedly make requests to check for updates, resulting in unnecessary requests and latency.  

| **Feature**            | **HTTP**                              | **WebSocket.IO**                      |
|-------------------------|---------------------------------------|---------------------------------------|
| **Connection**          | Opens and closes for each request    | Persistent connection after initial handshake |
| **Communication Type**  | Request-response (client initiates)  | Bidirectional (both client and server can send messages) |
| **Headers**             | Sent with every request and response | Sent only during the initial handshake |
| **Real-time Updates**   | Requires polling or long-polling     | Server pushes updates to the client instantly |
| **Overhead**            | High due to repeated connections and headers | Low after the initial connection setup |
| **Latency**             | Relatively higher due to request-response model | Very low, optimized for real-time communication |
| **Use Cases**           | Loading webpages, API requests       | Chat applications, multiplayer games, live notifications |
| **Scalability**         | Handles a large number of short-lived connections | Efficient for long-lived connections, but requires scaling solutions for very large systems |
| **Event-based Model**   | Not natively supported               | Supports event-driven architecture (e.g., `emit` and `on`) |
| **Security**            | Relies on HTTPS for encryption       | Uses WebSocket Secure (wss) for encryption |
