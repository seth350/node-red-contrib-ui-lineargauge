# node-red-contrib-ui-lineargauge
A Node-Red template that creates a linear gauge with high/low limits and animated sliding pointer.

This is very useful for quickly checking many different kinds of processes and how they are performing.
Ideally, the pointer should be in the center of the gauge. This would indicate that the process is at it's setpoint.

This gauge has three different zones. One in the center is your acceptable value window. The top is the high limit zone and the bottom is the low limit zone. This way you can easily see how close the process is to it's high or low limit.

![LinearGaugeImg](https://github.com/seth350/node-red-contrib-ui-lineargauge/blob/master/lineargauge.png?raw=true)

# Instructions
1. Make sure you have the latest version of Node-Red installed and dashboard.
1. Add a ui_template node to your Node-Red flow.
1. Copy and paste the contents of lineargauge.txt into the created ui_template node.
1. The variables to inject:
`msg.payload.currentvalue`
`msg.payload.setpoint`
`msg.payload.highlimit`
` msg.payload.lowlimit`
