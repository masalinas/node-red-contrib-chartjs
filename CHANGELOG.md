### 0.2.6: First Release

**Enhancements**

 - Draw any chart from Chart.js: Bubble, Doughtnut, Horizontal, Vertical, Line, Pie, Polar and Radar Chart in different url paths defined at runtime from node.

**Fixes**

### 0.3.0: First Release with enhancements

**Fixes**

 - Resolve the scrollbar showed in any graph

 **Enhancements**

 - Add Bootstrap to manage the export chart in image png or pdf format

### 0.4.0: Second Release

**Fixes**

 - Refactor the code to manage socket.io server better. Now each node is responsible to create
the socket.io server if not exist in the node-RED instance. The node save the socket.io server instance in the node-RED global context **io** variable. This new way to manage the socket-io server permit resolve two problems:
* The initial configuration of each template node will be load the first time.
* The node will be able to work with other nodes that use socket.io server too, Of course the global context **io** variable will be reserver by me.

 **Enhancements**

### 0.4.1: Second Release

**Fixes**

 - Refactor the code to manage socket.io server better. The configuration chart is loades ar first time.

 **Enhancements**

### 0.5.2: Second Release
**Fixes**


 **Enhancements**

 - Multiserial configuration for the line charts. You could inject several series on the same graph
