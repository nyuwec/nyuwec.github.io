(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(30)},17:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),o=n(5),r=n.n(o),s=(n(17),n(6)),l=n(7),c=n(10),h=n(8),u=n(11),d=n(1),y=n(9),g=n.n(y),w=(n(26),n(28),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(h.a)(t).call(this,i.Component))).state={containerStyles:e.generateContainerStyles(),images:Array.from(Array(9).keys()).map(function(e){return{original:"./assets/mihalykoles/g_koles_mihaly_0000"+(e+1)+".jpeg",thumbnail:"./assets/mihalykoles/g_koles_mihaly_0000"+(e+1)+".jpeg"}}),orientation:"portrait"},e.updateStyle=e.updateStyle.bind(Object(d.a)(Object(d.a)(e))),e.generateContainerStyles=e.generateContainerStyles.bind(Object(d.a)(Object(d.a)(e))),e.handleDeviceOrientationChange=e.handleDeviceOrientationChange.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.updateStyle),window.addEventListener("orientationchange",this.handleDeviceOrientationChange)}},{key:"handleDeviceOrientationChange",value:function(){90===Math.abs(window.orientation)?this.setState({orientation:"landscape"}):this.setState({orientation:"portrait"}),this.updateStyle()}},{key:"calculateDimensions",value:function(){var e=1.57*window.innerHeight;return e>window.innerWidth&&(e=window.innerWidth),{height:window.innerHeight,width:e}}},{key:"generateContainerStyles",value:function(){if(this.state&&"landscape"===this.state.orientation)return{width:"100%",height:"100%",margin:"auto"};var e=this.calculateDimensions();return{width:"".concat(e.width,"px"),height:"".concat(e.height,"px"),margin:"auto"}}},{key:"updateStyle",value:function(){this.setState({containerStyles:this.generateContainerStyles()})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateStyle)}},{key:"render",value:function(){return a.a.createElement("div",{style:this.state.containerStyles},a.a.createElement(g.a,{items:this.state.images,slideInterval:1e4}))}}]),t}(i.Component));r.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.bed3c42a.chunk.js.map