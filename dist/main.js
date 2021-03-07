(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n,a){e(2,arguments);var r=t(n),i=t(a),o=r.getTime()-i.getTime();return o<0?-1:o>0?1:o}function a(n,a){e(2,arguments);var r=t(n),i=t(a),o=r.getFullYear()-i.getFullYear(),d=r.getMonth()-i.getMonth();return 12*o+d}function r(n){e(1,arguments);var a=t(n);return a.setHours(23,59,59,999),a}function i(n){e(1,arguments);var a=t(n),r=a.getMonth();return a.setFullYear(a.getFullYear(),r+1,0),a.setHours(23,59,59,999),a}function o(n){e(1,arguments);var a=t(n);return r(a).getTime()===i(a).getTime()}function d(r,i){e(2,arguments);var d,u=t(r),s=t(i),l=n(u,s),c=Math.abs(a(u,s));if(c<1)d=0;else{1===u.getMonth()&&u.getDate()>27&&u.setDate(30),u.setMonth(u.getMonth()-l*c);var m=n(u,s)===-l;o(t(r))&&1===c&&1===n(r,s)&&(m=!1),d=l*(c-m)}return 0===d?0:d}function u(n,a){e(2,arguments);var r=t(n),i=t(a);return r.getTime()-i.getTime()}function s(t,n){e(2,arguments);var a=u(t,n)/1e3;return a>0?Math.floor(a):Math.ceil(a)}var l={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function c(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var m,f={date:c({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:c({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:c({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},h={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function g(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var d=e.defaultWidth,u=r.width?String(r.width):e.defaultWidth;a=e.values[u]||e.values[d]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function v(e){return function(t,n){var a=String(t),r=n||{},i=r.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],d=a.match(o);if(!d)return null;var u,s=d[0],l=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(l)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(s))return n}(l):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(s))return n}(l),u=e.valueCallback?e.valueCallback(u):u,{value:u=r.valueCallback?r.valueCallback(u):u,rest:a.slice(s.length)}}}const p={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof l[e]?l[e]:1===t?l[e].one:l[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:f,formatRelative:function(e,t,n,a){return h[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:g({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:g({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:g({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:g({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:g({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(m={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(m.matchPattern);if(!r)return null;var i=r[0],o=n.match(m.parsePattern);if(!o)return null;var d=m.valueCallback?m.valueCallback(o[0]):o[0];return{value:d=a.valueCallback?a.valueCallback(d):d,rest:n.slice(i.length)}}),era:v({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:v({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:v({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:v({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:v({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function y(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t=t||{})t.hasOwnProperty(n)&&(e[n]=t[n]);return e}({},e)}function b(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var w=1440,k=43200;function M(a,r,i){e(2,arguments);var o=i||{},u=o.locale||p;if(!u.formatDistance)throw new RangeError("locale must contain formatDistance property");var l=n(a,r);if(isNaN(l))throw new RangeError("Invalid time value");var c,m,f=y(o);f.addSuffix=Boolean(o.addSuffix),f.comparison=l,l>0?(c=t(r),m=t(a)):(c=t(a),m=t(r));var h,g=s(m,c),v=(b(m)-b(c))/1e3,M=Math.round((g-v)/60);if(M<2)return o.includeSeconds?g<5?u.formatDistance("lessThanXSeconds",5,f):g<10?u.formatDistance("lessThanXSeconds",10,f):g<20?u.formatDistance("lessThanXSeconds",20,f):g<40?u.formatDistance("halfAMinute",null,f):g<60?u.formatDistance("lessThanXMinutes",1,f):u.formatDistance("xMinutes",1,f):0===M?u.formatDistance("lessThanXMinutes",1,f):u.formatDistance("xMinutes",M,f);if(M<45)return u.formatDistance("xMinutes",M,f);if(M<90)return u.formatDistance("aboutXHours",1,f);if(M<w){var D=Math.round(M/60);return u.formatDistance("aboutXHours",D,f)}if(M<2520)return u.formatDistance("xDays",1,f);if(M<k){var E=Math.round(M/w);return u.formatDistance("xDays",E,f)}if(M<86400)return h=Math.round(M/k),u.formatDistance("aboutXMonths",h,f);if((h=d(m,c))<12){var x=Math.round(M/k);return u.formatDistance("xMonths",x,f)}var T=h%12,S=Math.floor(h/12);return T<3?u.formatDistance("aboutXYears",S,f):T<9?u.formatDistance("overXYears",S,f):u.formatDistance("almostXYears",S+1,f)}function D(t,n){return e(1,arguments),M(t,Date.now(),n)}function E(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var x=36e5,T={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},S=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,j=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,N=/^([+-])(\d{2})(?::?(\d{2}))?$/;function I(t,n){e(1,arguments);var a=n||{},r=null==a.additionalDigits?2:E(a.additionalDigits);if(2!==r&&1!==r&&0!==r)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,o=W(t);if(o.date){var d=P(o.date,r);i=B(d.restDateString,d.year)}if(isNaN(i)||!i)return new Date(NaN);var u,s=i.getTime(),l=0;if(o.time&&(l=A(o.time),isNaN(l)||null===l))return new Date(NaN);if(!o.timezone){var c=new Date(s+l),m=new Date(0);return m.setFullYear(c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()),m.setHours(c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),c.getUTCMilliseconds()),m}return u=H(o.timezone),isNaN(u)?new Date(NaN):new Date(s+l+u)}function W(e){var t,n={},a=e.split(T.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?(n.date=null,t=a[0]):(n.date=a[0],t=a[1],T.timeZoneDelimiter.test(n.date)&&(n.date=e.split(T.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=T.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function P(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:null};var r=a[1]&&parseInt(a[1]),i=a[2]&&parseInt(a[2]);return{year:null==i?r:100*i,restDateString:e.slice((a[1]||a[2]).length)}}function B(e,t){if(null===t)return null;var n=e.match(S);if(!n)return null;var a=!!n[4],r=C(n[1]),i=C(n[2])-1,o=C(n[3]),d=C(n[4]),u=C(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,d,u)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,d,u):new Date(NaN);var s=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(F[t]||(O(e)?29:28))}(t,i,o)&&function(e,t){return t>=1&&t<=(O(e)?366:365)}(t,r)?(s.setUTCFullYear(t,i,Math.max(r,o)),s):new Date(NaN)}function C(e){return e?parseInt(e):1}function A(e){var t=e.match(j);if(!t)return null;var n=L(t[1]),a=L(t[2]),r=L(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,r)?n*x+6e4*a+1e3*r:NaN}function L(e){return e&&parseFloat(e.replace(",","."))||0}function H(e){if("Z"===e)return 0;var t=e.match(N);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,r)?n*(a*x+6e4*r):NaN}var F=[31,null,31,30,31,30,31,31,30,31,30,31];function O(e){return e%400==0||e%4==0&&e%100}let X=[];const Y=document.getElementById("show-project-form"),U=document.getElementById("add-project-form"),q=document.getElementById("add-project"),z=document.getElementById("project-title"),J=document.getElementById("project-description"),$=document.getElementById("project-due-date"),Z=document.getElementById("projects-container"),R=document.getElementById("add-task-form"),Q=document.getElementById("add-task"),V=document.getElementById("task-title"),G=document.getElementById("task-description"),K=document.getElementById("task-due-date"),_=document.getElementById("task-priority"),ee=document.getElementById("task-notes"),te=document.getElementById("edit-project-form"),ne=document.getElementById("edit-project"),ae=document.getElementById("edit-project-title"),re=document.getElementById("edit-project-description"),ie=document.getElementById("edit-project-due-date"),oe=document.getElementById("edit-task-form"),de=document.getElementById("edit-task"),ue=document.getElementById("edit-task-title"),se=document.getElementById("edit-task-description"),le=document.getElementById("edit-task-due-date"),ce=document.getElementById("edit-task-priority"),me=document.getElementById("edit-task-notes"),fe=document.getElementById("x-project-form"),he=document.getElementById("x-edit-project"),ge=document.getElementById("x-task-form"),ve=document.getElementById("x-edit-task"),pe=document.getElementById("sidebar-container");function ye(){localStorage.setItem("projectsArray",JSON.stringify(X))}function be(){Z.innerHTML="",pe.innerHTML="",X.forEach((e=>{if(null!=e){let a=document.createElement("button");a.innerHTML=e.title,a.classList.add("sidebar-button"),a.addEventListener("click",(function(){r.hidden?r.hidden=!1:r.hidden=!0}));let r=document.createElement("div");r.setAttribute("hidden",!0),r.setAttribute("data-index",X.indexOf(e)),r.setAttribute("class","project-display"),ne.addEventListener("click",(function(){X[ne.dataset.index].title=ae.value,X[ne.dataset.index].description=re.value,X[ne.dataset.index].dueDate=ie.value,ye(),te.hidden=!0,a.innerHTML=e.title,t()}));let i=document.createElement("p"),o=document.createElement("button");function t(){i.innerHTML="<br>Project: "+e.title+"<br>Description: "+e.description+"<br>Due Date: "+D(I(e.dueDate),{addSuffix:!0})}t(),o.innerText="Delete Project",o.setAttribute("data-index",X.indexOf(e)),o.addEventListener("click",(function(){delete X[o.dataset.index],ye(),Z.removeChild(r),pe.removeChild(a)}));let d=document.createElement("button");d.innerHTML="Edit Project",d.addEventListener("click",(function(){te.hidden=!1,ne.setAttribute("data-index",X.indexOf(e)),ae.value=e.title,re.value=e.description,ie.value=e.dueDate}));let u=document.createElement("button");u.innerHTML="Add Task",u.addEventListener("click",(function(){R.hidden=!1,Q.setAttribute("data-index",X.indexOf(e))}));let s=document.createElement("div");s.setAttribute("hidden",!0);let l=document.createElement("button");function n(){e.tasks.every((e=>null===e))&&l.setAttribute("hidden",!0)}l.classList.add("show-task-button"),l.setAttribute("data-index",X.indexOf(e)),l.addEventListener("click",(function(){s.hidden?(s.hidden=!1,l.innerHTML="Hide Tasks"):(s.hidden=!0,l.innerHTML="Show Tasks")})),l.innerHTML="Show Tasks",n(),e.tasks.forEach((t=>{if(null!=t){de.addEventListener("click",(function(){X[de.dataset.projectindex].tasks[de.dataset.taskindex].title=ue.value,X[de.dataset.projectindex].tasks[de.dataset.taskindex].description=se.value,X[de.dataset.projectindex].tasks[de.dataset.taskindex].dueDate=le.value,X[de.dataset.projectindex].tasks[de.dataset.taskindex].priority=ce.value,X[de.dataset.projectindex].tasks[de.dataset.taskindex].notes=me.value,ye(),oe.hidden=!0,a()}));let r=document.createElement("p"),i=document.createElement("button");i.innerHTML="Delete Task";let o=document.createElement("button");function a(){r.innerHTML="<br>Task: "+t.title+"<br>Description: "+t.description+"<br>Due Date: "+D(I(t.dueDate),{addSuffix:!0})+"<br>Priority: "+t.priority+"<br>Notes: "+t.notes+"<br>",r.append(o,i),s.append(r)}o.innerHTML="Edit Task",a(),i.setAttribute("data-index",e.tasks.indexOf(t)),i.addEventListener("click",(function(){delete e.tasks[i.dataset.index],n(),ye(),s.removeChild(r)})),o.addEventListener("click",(function(){oe.hidden=!1,de.setAttribute("data-projectindex",X.indexOf(e)),de.setAttribute("data-taskindex",e.tasks.indexOf(t)),ue.value=t.title,se.value=t.description,le.value=t.dueDate,ce.value=t.priority,me.value=t.notes}))}})),r.append(i,s,l,u,d,o),Z.appendChild(r),pe.appendChild(a)}}))}Y.addEventListener("click",(function(){U.hidden=!1})),q.addEventListener("click",(function(){if(""!=z.value&&""!=J.value&&""!=$.value){let a=(e=z.value,t=J.value,n=$.value,{title:e,description:t,dueDate:n,tasks:[]});X.push(a),ye(),U.hidden=!0,be();let r=document.querySelectorAll(`[data-index="${X.length-1}"]`);console.log(r),r.forEach((e=>{e.hidden=!1}))}var e,t,n})),Q.addEventListener("click",(function(){if(""!=V.value&&""!=G.value&&""!=K.value&&""!=_.value&&""!=ee.value){let i=(e=V.value,t=G.value,n=K.value,a=_.value,r=ee.value,{title:e,description:t,dueDate:n,priority:a,notes:r});X[Q.dataset.index].tasks.push(i),ye(),R.hidden=!0,be(),document.querySelectorAll(`[data-index="${Q.dataset.index}"]`).forEach((e=>{e.hidden=!1})),document.querySelectorAll(".show-task-button").forEach((e=>{e.dataset.index===Q.dataset.index&&e.click()}))}var e,t,n,a,r})),fe.addEventListener("click",(function(){U.hidden=!0,z.value="",J.value="",$.value=""})),he.addEventListener("click",(function(){te.hidden=!0})),ge.addEventListener("click",(function(){R.hidden=!0,G.value="",K.value="",ee.value="",_.value="",V.value=""})),ve.addEventListener("click",(function(){oe.hidden=!0})),X=JSON.parse(localStorage.getItem("projectsArray")),(null===X||X.every((e=>null===e)))&&(X=[]),be(),console.log(X)})();