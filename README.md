# node-red-contrib-ui-lineargauge
A Node-Red template that creates a linear gauge with high/low limits and animated sliding pointer.

This is very useful for quickly checking many different kinds of processes and how they are performing.
Ideally, the pointer should be in the center of the gauge. This would indicate that the process is at it's setpoint.

This gauge has three different zones. One in the center is your acceptable value window. The top is the high limit zone and the bottom is the low limit zone. This way you can easily see how close the process is to it's high or low limit.

You can optionally enter a high/low/setpoint in the node configuration.
The node can also be injected with these values using,
High Limit: `msg.highlimit`
Setpoint: `msg.setpoint`
Low Limit: `msg.lowlimit`

Using `msg.payload` as the value to display and position the pointer.

![LinearGaugeImg](https://github.com/seth350/node-red-contrib-ui-lineargauge/blob/master/lineargauge.png?raw=true)

# Requirements
Node-Red v19.4 or greater
Node-Red-dashboard v2.13.0 or greater

# Contributors
Thank you Bart for turning this into a working node-red node. 
https://github.com/bartbutenaers
