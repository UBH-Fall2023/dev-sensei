import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Learning = () => {
  const data = {
    Introduction: [
      "System design is the process of defining the elements of a system, as well as their interactions and relationships, in order to satisfy a set of specified requirements. \nIt involves taking a problem statement, breaking it down into smaller components and designing each component to work together effectively to achieve the overall goal of the system. This process typically includes analyzing the current system (if any) and determining any deficiencies, creating a detailed plan for the new system, and testing the design to ensure that it meets the requirements. It is an iterative process that may involve multiple rounds of design, testing, and refinement.\nIn software engineering, system design is a phase in the software development process that focuses on the high-level design of a software system, including the architecture and components.\nIt is also one of the important aspects of the interview process for software engineers. Most of the companies have a dedicated system design interview round, where they ask the candidates to design a system for a given problem statement. The candidates are expected to come up with a detailed design of the system, including the architecture, components, and their interactions. They are also expected to discuss the trade-offs involved in their design and the alternatives that they considered.",
    ],
    "How To Approach System Design": [
      "Understand the problem: Gather information about the problem you are trying to solve and the requirements of the system. Identify the users and their needs, as well as any constraints or limitations of the system.",
      "Identify the scope of the system: Define the boundaries of the system, including what the system will do and what it will not do.",
      "Research and analyze existing systems: Look at similar systems that have been built in the past and identify what worked well and what didn’t. Use this information to inform your design decisions.",
      "Create a high-level design: Outline the main components of the system and how they will interact with each other. This can include a rough diagram of the system’s architecture, or a flowchart outlining the process the system will follow.",
      "Refine the design: As you work on the details of the design, iterate and refine it until you have a complete and detailed design that meets all the requirements.",
      "Document the design: Create detailed documentation of your design for future reference and maintenance.",
      "Continuously monitor and improve the system: The system design is not a one-time process, it needs to be continuously monitored and improved to meet the changing requirements.",
    ],
    "Performance vs scalability": [
      "A service is scalable if it results in increased performance in a manner proportional to resources added. Generally, increasing performance means serving more units of work, but it can also be to handle larger units of work, such as when datasets grow.",
    ],
    "Latency vs throughput": [
      "Latency is the time to perform some action or to produce some result.Throughput is the number of such actions or results per unit of time.Generally, you should aim for maximal throughput with acceptable latency.",
    ],
    "CAP Theorem": [
      "According to CAP theorem, in a distributed system, you can only support two of the following guarantees: Consistency - Every read receives the most recent write or an error. Availability - Every request receives a response, without guarantee that it contains the most recent version of the information. Partition Tolerance - The system continues to operate despite arbitrary partitioning due to network failures",
    ],
    "Consistency patterns": [
      "With multiple copies of the same data, we are faced with options on how to synchronize them so clients have a consistent view of the data. Recall the definition of consistency from the CAP theorem - Every read receives the most recent write or an error.",
      "Weak consistency-After a write, reads may or may not see it. A best effort approach is taken.This approach is seen in systems such as memcached. Weak consistency works well in real time use cases such as VoIP, video chat, and realtime multiplayer games. For example, if you are on a phone call and lose reception for a few seconds, when you regain connection you do not hear what was spoken during connection loss.",
      "Eventual consistency-After a write, reads will eventually see it (typically within milliseconds). Data is replicated asynchronously.This approach is seen in systems such as DNS and email. Eventual consistency works well in highly available systems.",
      "Strong consistency-After a write, reads will see it. Data is replicated synchronously.This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need transactions.",
    ],
    "Availability patterns(Fail-over)": [
      "Active-passive: With active-passive fail-over, heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service. The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby. Only the active server handles traffic. Active-passive failover can also be referred to as master-slave failover.",
      "Active-active: In active-active, both servers are managing traffic, spreading the load between them. If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers.Active-active failover can also be referred to as master-master failover.",
    ],
    "Domain name system": [
      "A Domain Name System (DNS) translates a domain name such as www.example.com to an IP address. DNS is hierarchical, with a few authoritative servers at the top level. Your router or ISP provides information about which DNS server(s) to contact when doing a lookup. Lower level DNS servers cache mappings, which could become stale due to DNS propagation delays. DNS results can also be cached by your browser or OS for a certain period of time, determined by the time to live (TTL).",
    ],
    "Content delivery network": [
      "A content delivery network (CDN) is a globally distributed network of proxy servers, serving content from locations closer to the user. Generally, static files such as HTML/CSS/JS, photos, and videos are served from CDN, although some CDNs such as Amazon's CloudFront support dynamic content. The site's DNS resolution will tell clients which server to contact.",
    ],
    "Push CDNs": [
      "Push CDNs receive new content whenever changes occur on your server. You take full responsibility for providing content, uploading directly to the CDN and rewriting URLs to point to the CDN. You can configure when content expires and when it is updated. Content is uploaded only when it is new or changed, minimizing traffic, but maximizing storage. Sites with a small amount of traffic or sites with content that isn't often updated work well with push CDNs. Content is placed on the CDNs once, instead of being re-pulled at regular intervals.",
    ],
    "Pull CDNs": [
      "Pull CDNs grab new content from your server when the first user requests the content. You leave the content on your server and rewrite URLs to point to the CDN. This results in a slower request until the content is cached on the CDN.A time-to-live (TTL) determines how long content is cached. Pull CDNs minimize storage space on the CDN, but can create redundant traffic if files expire and are pulled before they have actually changed. Sites with heavy traffic work well with pull CDNs, as traffic is spread out more evenly with only recently-requested content remaining on the CDN.",
    ],
    "Load balancer": [
      "Load balancers distribute incoming client requests to computing resources such as application servers and databases. In each case, the load balancer returns the response from the computing resource to the appropriate client. Load balancers are effective at:",
      "Preventing requests from going to unhealthy servers",
      "Preventing overloading resources",
      "Helping to eliminate a single point of failure",
      "Load balancers can be implemented with hardware (expensive) or with software such as HAProxy.",
    ],
    "Reverse proxy (web server)": [
      "A reverse proxy is a web server that centralizes internal services and provides unified interfaces to the public. Requests from clients are forwarded to a server that can fulfill it before the reverse proxy returns the server's response to the client.",
    ],
    "Load balancer vs reverse proxy": [
      "Deploying a load balancer is useful when you have multiple servers. Often, load balancers route traffic to a set of servers serving the same function.",
      "Reverse proxies can be useful even with just one web server or application server, opening up the benefits described in the previous section.",
      "Solutions such as NGINX and HAProxy can support both layer 7 reverse proxying and load balancing.",
    ],
    "Service Discovery": [
      "Systems such as Consul, Etcd, and Zookeeper can help services find each other by keeping track of registered names, addresses, and ports. Health checks help verify service integrity and are often done using an HTTP endpoint. Both Consul and Etcd have a built in key-value store that can be useful for storing config values and other shared data.",
    ],
    Database: [
      "Picking the right database for a system is an important decision, as it can have a significant impact on the performance, scalability, and overall success of the system. Some of the key reasons why it’s important to pick the right database include:",
      "Performance: Different databases have different performance characteristics, and choosing the wrong one can lead to poor performance and slow response times.",
      "Scalability: As the system grows and the volume of data increases, the database needs to be able to scale accordingly. Some databases are better suited for handling large amounts of data than others.",
      "Data Modeling: Different databases have different data modeling capabilities and choosing the right one can help to keep the data consistent and organized.",
      "Data Integrity: Different databases have different capabilities for maintaining data integrity, such as enforcing constraints, and can have different levels of data security.",
      "Support and maintenance: Some databases have more active communities and better documentation, making it easier to find help and resources.",
    ],
    "Relational database management system (RDBMS)": [
      "A relational database like SQL is a collection of data items organized in tables.",
      "ACID is a set of properties of relational database transactions.",
      "Atomicity - Each transaction is all or nothing",
      "Consistency - Any transaction will bring the database from one valid state to another",
      "Isolation - Executing transactions concurrently has the same results as if the transactions were executed serially",
      "Durability - Once a transaction has been committed, it will remain so",
      "There are many techniques to scale a relational database: master-slave replication, master-master replication, federation, sharding, denormalization, and SQL tuning.",
    ],
    "Master-slave replication": [
      "The master serves reads and writes, replicating writes to one or more slaves, which serve only reads. Slaves can also replicate to additional slaves in a tree-like fashion. If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned.",
    ],
    "Master-master replication": [
      "Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes.",
    ],
    Federation: [
      "Federation (or functional partitioning) splits up databases by function. For example, instead of a single, monolithic database, you could have three databases: forums, users, and products, resulting in less read and write traffic to each database and therefore less replication lag. Smaller databases result in more data that can fit in memory, which in turn results in more cache hits due to improved cache locality. With no single central master serializing writes you can write in parallel, increasing throughput.",
    ],
    Sharding: [
      "Sharding distributes data across different databases such that each database can only manage a subset of the data. Taking a users database as an example, as the number of users increases, more shards are added to the cluster.",
      "Similar to the advantages of federation, sharding results in less read and write traffic, less replication, and more cache hits. Index size is also reduced, which generally improves performance with faster queries. If one shard goes down, the other shards are still operational, although you'll want to add some form of replication to avoid data loss. Like federation, there is no single central master serializing writes, allowing you to write in parallel with increased throughput.",
      "Common ways to shard a table of users is either through the user's last name initial or the user's geographic location.",
    ],
    NoSQL: [
      "NoSQL is a collection of data items represented in a key-value store, document store, wide column store, or a graph database. Data is denormalized, and joins are generally done in the application code. Most NoSQL stores lack true ACID transactions and favor eventual consistency.",
      "BASE is often used to describe the properties of NoSQL databases. In comparison with the CAP Theorem, BASE chooses availability over consistency.",
    ],
    "Key-value store": [
      "A key-value store generally allows for O(1) reads and writes and is often backed by memory or SSD. Data stores can maintain keys in lexicographic order, allowing efficient retrieval of key ranges. Key-value stores can allow for storing of metadata with a value.",
      "Key-value stores provide high performance and are often used for simple data models or for rapidly-changing data, such as an in-memory cache layer. Since they offer only a limited set of operations, complexity is shifted to the application layer if additional operations are needed.",
      "A key-value store is the basis for more complex systems such as a document store, and in some cases, a graph database.",
    ],
    "Document store": [
      "A document store is centered around documents (XML, JSON, binary, etc), where a document stores all information for a given object. Document stores provide APIs or a query language to query based on the internal structure of the document itself. Note, many key-value stores include features for working with a value's metadata, blurring the lines between these two storage types.",
      "Based on the underlying implementation, documents are organized by collections, tags, metadata, or directories. Although documents can be organized or grouped together, documents may have fields that are completely different from each other.",
    ],
    "Wide column store": [
      "A wide column store's basic unit of data is a column (name/value pair). A column can be grouped in column families (analogous to a SQL table). Super column families further group column families. You can access each column independently with a row key, and columns with the same row key form a row. Each value contains a timestamp for versioning and for conflict resolution.",
      "Google introduced Bigtable as the first wide column store, which influenced the open-source HBase often-used in the Hadoop ecosystem, and Cassandra from Facebook. Stores such as BigTable, HBase, and Cassandra maintain keys in lexicographic order, allowing efficient retrieval of selective key ranges.",
    ],
    "Graph database": [
      "In a graph database, each node is a record and each arc is a relationship between two nodes. Graph databases are optimized to represent complex relationships with many foreign keys or many-to-many relationships.",
      "Graphs databases offer high performance for data models with complex relationships, such as a social network. They are relatively new and are not yet widely-used; it might be more difficult to find development tools and resources. Many graphs can only be accessed with REST APIs.",
    ],
    Cache: [
      "Caching improves page load times and can reduce the load on your servers and databases. In this model, the dispatcher will first lookup if the request has been made before and try to find the previous result to return, in order to save the actual execution.",
      "Databases often benefit from a uniform distribution of reads and writes across its partitions. Popular items can skew the distribution, causing bottlenecks. Putting a cache in front of a database can help absorb uneven loads and spikes in traffic.",
    ],
    "Message queues": [
      "Message queues receive, hold, and deliver messages. If an operation is too slow to perform inline, you can use a message queue with the following workflow:",
      "An application publishes a job to the queue, then notifies the user of job status",
      "A worker picks up the job from the queue, processes it, then signals the job is complete",
      "The user is not blocked and the job is processed in the background. During this time, the client might optionally do a small amount of processing to make it seem like the task has completed. For example, if posting a tweet, the tweet could be instantly posted to your timeline, but it could take some time before your tweet is actually delivered to all of your followers.",
    ],
  };

  let result = Object.entries(data);

  //   for(let i in data) {
  //     result.push()
  //   }

  console.log(result);

  const [expand, setExpand] = useState({
    isExpanded: false,
    expandedIndex: -1,
  });

  const toggleExpandHandler = (index) => {
    // if(expand.expandedIndex===index) {
        setExpand({
            isExpanded: index === expand.expandedIndex ? !expand.isExpanded:true,
            expandedIndex: index === expand.expandedIndex ? -1 : index,
        })
  };

  return (
    <main class="flex flex-col gap-2 overflow-y-auto p-4 w-full">
      {result.map((item, index) => (
        <div className=" w-3/4 mx-auto">
          <button
            className="flex flex-col items-center justify-center bg-white px-4 py-6 rounded-lg shadow-md gap-3 w-full"
            onClick={() => toggleExpandHandler(index)}
          >
            <h1 className=" text-xl font-bold">{item[0]}</h1>
          </button>
          <div className={` overflow-hidden transition-all duration-500 ${expand.isExpanded && expand.expandedIndex===index ? "max-h-[1000px]" : "max-h-0"}`}>
          {expand.isExpanded && expand.expandedIndex===index && 
          <ul className=" list-disc px-6 py-2 border border-black rounded-lg mt-1 bg-gray-100">
            {item[1].map((subItem, subIndex) => (
              <li>{subItem}</li>
            ))}
          </ul>}
          </div>
        </div>
      ))}
      {/* <div className=" flex items-center justify-center">
            <p className="h-1 bg-black"></p>
        </div> */}
    </main>
  );
};

export default Learning;
