/**
 * Copyright 2018 Seth350
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 module.exports = function(RED) {
    var settings = RED.settings;  

    function HTML(config) {
        var html = String.raw`
            <style>
                .linearGauge1 {
                    top: 0px;
                    left: 10px;
                    position:absolute;
                    width:20px;
                    height:11px;
                }

                #lgValue {
                    position: absolute;
                    width:64px;
                    height:11px;
                    justify-content: center;
                    text-align:center;
                    font-size:12px;
                }

                .pointer {
                    fill:#696969;
                    stroke-width: 1px;
                    stroke: #404040;
                }

                .scaleArea1 {
                    fill: ` + config.colorLowArea + `;
                    stroke: #000;
                    stroke-width: 1px;
                }

                .scaleArea2 {
                    fill: ` + config.colorMidArea + `;
                    stroke: #000;
                    stroke-width: 1px;
                }

                .scaleArea3 {
                    fill: ` + config.colorHighArea + `;
                    stroke: #000;
                    stroke-width: 1px;
                }

                .scaleContainer {
                    height:188px;
                    width:100%;
                }
            </style>
            
            <div id="valueContainer">
                <text class="lgText" dx="10" dy="3">{{msg.payload}}`+config.unit+`</text>
            </div>
            <div class="linearGauge">
                <svg class="scaleContainer">
                    <title id="lt1"></title>
                    <rect class="scaleArea1" x="0" y="141" width="20" height="47"></rect>
                    <rect class="scaleArea2" x="0" y="47" width="20" height="94"></rect>
                    <rect class="scaleArea3" x="0" y="0" width="20" height="47"></rect>
                    <path id="lgPtr" d="M0,9.306048591020996L10.74569931823542,-9.306048591020996 -10.74569931823542,-9.306048591020996Z" class="pointer" transform="translate(10,0)rotate(90)">
                    </path>
                </svg>
            </div>
            <text class="lgText" dx="10" dy="3">`+config.name+`</text>
        `;
        return html;
    };

    var ui = undefined;
    
    function LinearGaugeNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            RED.nodes.createNode(this, config);
            debugger;
            var done = null;
            var html = HTML(config);
            done = ui.addWidget({
                node: node,
                width: config.width,
                height: config.height,
                format: html,
                templateScope: "local",
                group: config.group,
                emitOnlyNewValues: false,
                forwardInputMessages: false,
                storeFrontEndInputAsState: false,
                convertBack: function (value) {
                    return value;
                },
                beforeEmit: function(msg, value) {
                    return { msg: msg };
                },
                beforeSend: function (msg, orig) {
                    if (orig) {
                        return orig.msg;
                    }
                },
                initController: function($scope, events) {
                    debugger;
                    $scope.flag = true;
                    $scope.$watch('msg', function(msg) {
                        var input = msg.payload
                        var maxRange = config.highLimit||msg.highlimit
                        var minRange = config.lowLimit||msg.lowlimit
                        var minScale = 0
                        var maxScale = 188 //this is the length of the gauge
                        var setP = config.setpoint||msg.setpoint

                        var diffH = maxRange - setP //find difference between setpoint and max limit
                        var diffL = setP - minRange //find difference between setpoint and min limit
                        delta = ((diffH+diffL)/2)   //calculate the mean to allow the same span above/below setpoint

                        var sL = minRange - delta   //scaled low limit
                        var sH = maxRange + delta   //scaled high limit

                        var rate = (maxScale - minScale)/(sL - sH) 
                        var offset = minScale - (sH*rate)

                        var value = (input*rate)+offset

                        $("#lgPtr").animate(
                            {'foo':value},
                            {
                                step: function(foo){
                                    $(this).attr('transform', 'translate(10,'+foo+') rotate(90)');
                                },
                                duration: 400 //set the duration of the sliding animation of the pointer
                            }
                        );
                        $("#lt1").html("HL: "+maxRange+"&#013;LL: "+minRange+"&#013;SP: "+setP);
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
        }
        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("linear-gauge", LinearGaugeNode);
}