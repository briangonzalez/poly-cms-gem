/**
 * @license
 * Lo-Dash 2.1.0 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash underscore exports="amd,commonjs,global,node" -o ./dist/lodash.underscore.js`
 */
;(function(){function n(n,r,t){t=(t||0)-1;for(var e=n?n.length:0;++t<e;)if(n[t]===r)return t;return-1}function r(n,r){var t=n.l,e=r.l;if(t!==e){if(t>e||typeof t=="undefined")return 1;if(t<e||typeof e=="undefined")return-1}return n.m-r.m}function t(n){return"\\"+gr[n]}function e(){}function u(n){return n instanceof u?n:new o(n)}function o(n,r){this.__chain__=!!r,this.__wrapped__=n}function i(n,r,t){if(typeof n!="function")return Q;if(typeof r=="undefined")return n;switch(t){case 1:return function(t){return n.call(r,t)
};case 2:return function(t,e){return n.call(r,t,e)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){return n.call(r,t,e,u,o)}}return J(n,r)}function f(n,r,t,e){e=(e||0)-1;for(var u=n?n.length:0,o=[];++e<u;){var i=n[e];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Vr(i)||y(i))){r||(i=f(i,r,t));var a=-1,l=i.length,c=o.length;for(o.length+=l;++a<l;)o[c++]=i[a]}else t||o.push(i)}return o}function a(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(n===n&&!(n&&vr[typeof n]||r&&vr[typeof r]))return!1;
if(null==n||null==r)return n===r;var o=Sr.call(n),i=Sr.call(r);if(o!=i)return!1;switch(o){case ar:case lr:return+n==+r;case cr:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case sr:case hr:return n==r+""}if(i=o==fr,!i){if(Or.call(n,"__wrapped__")||r instanceof u)return a(n.__wrapped__||n,r.__wrapped__||r,t,e);if(o!=pr)return!1;var o=n.constructor,f=r.constructor;if(o!=f&&!(j(o)&&o instanceof o&&j(f)&&f instanceof f))return!1}for(t||(t=[]),e||(e=[]),o=t.length;o--;)if(t[o]==n)return e[o]==r;var l=!0,c=0;
if(t.push(n),e.push(r),i){if(c=r.length,l=c==n.length)for(;c--&&(l=a(n[c],r[c],t,e)););return l}return Xr(r,function(r,u,o){return Or.call(o,u)?(c++,!(l=Or.call(n,u)&&a(n[u],r,t,e))&&rr):void 0}),l&&Xr(n,function(n,r,t){return Or.call(t,r)?!(l=-1<--c)&&rr:void 0}),l}function l(n,r,t){for(var e=-1,u=v(),o=n?n.length:0,i=[],f=t?[]:i;++e<o;){var a=n[e],l=t?t(a,e,n):a;(r?!e||f[f.length-1]!==l:0>u(f,l))&&(t&&f.push(l),i.push(a))}return i}function c(n){return function(r,t,e){var u={};t=K(t,e,3),e=-1;var o=r?r.length:0;
if(typeof o=="number")for(;++e<o;){var i=r[e];n(u,i,t(i,e,r),r)}else Yr(r,function(r,e,o){n(u,r,t(r,e,o),o)});return u}}function p(n,r,t,e,u,o){var i=1&r,f=2&r,a=4&r,l=8&r,c=16&r,h=32&r,v=n;if(!f&&!j(n))throw new TypeError;if(c&&!t.length&&(r&=-17,c=t=!1),h&&!e.length&&(r&=-33,h=e=!1),!i||f||a||h||!(Ur.fastBind||Dr&&c))y=function(){var g=arguments,m=i?u:this;return(a||c||h)&&(g=zr.call(g),c&&Br.apply(g,t),h&&Rr.apply(g,e),a&&g.length<o)?(r|=16,p(n,l?r:-4&r,g,null,u,o)):(f&&(n=m[v]),this instanceof y?(m=s(n.prototype),g=n.apply(m,g),x(g)?g:m):n.apply(m,g))
};else{if(c){var g=[u];Rr.apply(g,t)}var y=c?Dr.apply(n,g):Dr.call(n,u)}return y}function s(n){return x(n)?Nr(n):{}}function h(n){return Jr[n]}function v(){var r=(r=u.indexOf)===U?n:r;return r}function g(n){return Kr[n]}function y(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Sr.call(n)==ir||!1}function m(n){if(!n)return n;for(var r=1,t=arguments.length;r<t;r++){var e=arguments[r];if(e)for(var u in e)n[u]=e[u]}return n}function _(n){if(!n)return n;for(var r=1,t=arguments.length;r<t;r++){var e=arguments[r];
if(e)for(var u in e)"undefined"==typeof n[u]&&(n[u]=e[u])}return n}function d(n){var r=[];return Xr(n,function(n,t){j(n)&&r.push(t)}),r.sort()}function b(n){for(var r=-1,t=Hr(n),e=t.length,u={};++r<e;){var o=t[r];u[n[o]]=o}return u}function w(n){if(!n)return!0;if(Vr(n)||T(n))return!n.length;for(var r in n)if(Or.call(n,r))return!1;return!0}function j(n){return typeof n=="function"}function x(n){return!(!n||!vr[typeof n])}function E(n){return typeof n=="number"||Sr.call(n)==cr}function T(n){return typeof n=="string"||Sr.call(n)==hr
}function A(n){for(var r=-1,t=Hr(n),e=t.length,u=Array(e);++r<e;)u[r]=n[t[r]];return u}function O(n,r){var t=v(),e=n?n.length:0,u=!1;return e&&typeof e=="number"?u=-1<t(n,r):Yr(n,function(n){return(u=n===r)&&rr}),u}function R(n,r,t){var e=!0;r=K(r,t,3),t=-1;var u=n?n.length:0;if(typeof u=="number")for(;++t<u&&(e=!!r(n[t],t,n)););else Yr(n,function(n,t,u){return!(e=!!r(n,t,u))&&rr});return e}function S(n,r,t){var e=[];r=K(r,t,3),t=-1;var u=n?n.length:0;if(typeof u=="number")for(;++t<u;){var o=n[t];
r(o,t,n)&&e.push(o)}else Yr(n,function(n,t,u){r(n,t,u)&&e.push(n)});return e}function B(n,r,t){r=K(r,t,3),t=-1;var e=n?n.length:0;if(typeof e!="number"){var u;return Yr(n,function(n,t,e){return r(n,t,e)?(u=n,rr):void 0}),u}for(;++t<e;){var o=n[t];if(r(o,t,n))return o}}function D(n,r,t){var e=-1,u=n?n.length:0;if(r=r&&typeof t=="undefined"?r:i(r,t,3),typeof u=="number")for(;++e<u&&r(n[e],e,n)!==rr;);else Yr(n,r)}function N(n,r){var t=n?n.length:0;if(typeof t=="number")for(;t--&&false!==r(n[t],t,n););else{var e=Hr(n),t=e.length;
Yr(n,function(n,u,o){return u=e?e[--t]:--t,false===r(o[u],u,o)&&rr})}}function k(n,r,t){var e=-1,u=n?n.length:0;if(r=K(r,t,3),typeof u=="number")for(var o=Array(u);++e<u;)o[e]=r(n[e],e,n);else o=[],Yr(n,function(n,t,u){o[++e]=r(n,t,u)});return o}function F(n,r,t){var e=-1/0,u=e,o=-1,i=n?n.length:0;if(r||typeof i!="number")r=K(r,t,3),D(n,function(n,t,o){t=r(n,t,o),t>e&&(e=t,u=n)});else for(;++o<i;)t=n[o],t>u&&(u=t);return u}function q(n,r){var t=-1,e=n?n.length:0;if(typeof e=="number")for(var u=Array(e);++t<e;)u[t]=n[t][r];
return u||k(n,r)}function M(n,r,t,e){if(!n)return t;var u=3>arguments.length;r=i(r,e,4);var o=-1,f=n.length;if(typeof f=="number")for(u&&(t=n[++o]);++o<f;)t=r(t,n[o],o,n);else Yr(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)});return t}function W(n,r,t,e){var u=3>arguments.length;return r=i(r,e,4),N(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)}),t}function $(n){var r=-1,t=n?n.length:0,e=Array(typeof t=="number"?t:0);return D(n,function(n){var t=Y(++r);e[r]=e[t],e[t]=n}),e}function I(n,r,t){var e;r=K(r,t,3),t=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++t<u&&!(e=r(n[t],t,n)););else Yr(n,function(n,t,u){return(e=r(n,t,u))&&rr});return!!e}function z(n,r,t){return t&&w(r)?Z:(t?B:S)(n,r)}function C(n){for(var r=-1,t=v(),e=n.length,u=f(arguments,!0,!0,1),o=[];++r<e;){var i=n[r];0>t(u,i)&&o.push(i)}return o}function P(n,r,t){var e=0,u=n?n.length:0;if(typeof r!="number"&&null!=r){var o=-1;for(r=K(r,t,3);++o<u&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[0]:Z;return zr.call(n,0,$r(Wr(0,e),u))}function U(r,t,e){if(typeof e=="number"){var u=r?r.length:0;
e=0>e?Wr(0,u+e):e||0}else if(e)return e=G(r,t),r[e]===t?e:-1;return n(r,t,e)}function V(n,r,t){if(typeof r!="number"&&null!=r){var e=0,u=-1,o=n?n.length:0;for(r=K(r,t,3);++u<o&&r(n[u],u,n);)e++}else e=null==r||t?1:Wr(0,r);return zr.call(n,e)}function G(n,r,t,e){var u=0,o=n?n.length:u;for(t=t?K(t,e,1):Q,r=t(r);u<o;)e=u+o>>>1,t(n[e])<r?u=e+1:o=e;return u}function H(n,r,t,e){return typeof r!="boolean"&&null!=r&&(t=(e=t)&&e[r]===n?null:r,r=!1),null!=t&&(t=K(t,e,3)),l(n,r,t)}function J(n,r){return 2<arguments.length?p(n,17,zr.call(arguments,2),null,r):p(n,1,null,null,r)
}function K(n,r,t){var e=typeof n;if(null==n||"function"==e)return i(n,r,t);if("object"!=e)return function(r){return r[n]};var u=Hr(n);return function(r){for(var t=u.length,e=!1;t--&&(e=r[u[t]]===n[u[t]]););return e}}function L(n,r,t){var e,u,o,i,f,a,l,c=0,p=!1,s=!0;if(!j(n))throw new TypeError;if(r=Wr(0,r)||0,true===t)var h=!0,s=!1;else x(t)&&(h=t.leading,p="maxWait"in t&&(Wr(r,t.maxWait)||0),s="trailing"in t?t.trailing:s);var v=function(){var t=r-(new Date-i);0<t?a=setTimeout(v,t):(u&&clearTimeout(u),t=l,u=a=l=Z,t&&(c=+new Date,o=n.apply(f,e)))
},g=function(){a&&clearTimeout(a),u=a=l=Z,(s||p!==r)&&(c=+new Date,o=n.apply(f,e))};return function(){if(e=arguments,i=+new Date,f=this,l=s&&(a||!h),false===p)var t=h&&!a;else{u||h||(c=i);var y=p-(i-c);0<y?u||(u=setTimeout(g,y)):(u&&(u=clearTimeout(u)),c=i,o=n.apply(f,e))}return a||r===p||(a=setTimeout(v,r)),t&&(o=n.apply(f,e)),o}}function Q(n){return n}function X(n){D(d(n),function(r){var t=u[r]=n[r];u.prototype[r]=function(){var n=[this.__wrapped__];return Rr.apply(n,arguments),n=t.apply(u,n),this.__chain__&&(n=new o(n),n.__chain__=!0),n
}})}function Y(n,r){return null==n&&null==r&&(r=1),n=+n||0,null==r?(r=n,n=0):r=+r||0,n+Ar(Ir()*(r-n+1))}var Z,nr=0,rr={},tr=+new Date+"",er=/($^)/,ur=/\bthis\b/,or=/['\n\r\t\u2028\u2029\\]/g,ir="[object Arguments]",fr="[object Array]",ar="[object Boolean]",lr="[object Date]",cr="[object Number]",pr="[object Object]",sr="[object RegExp]",hr="[object String]",vr={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},gr={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},yr=vr[typeof window]&&window||this,mr=vr[typeof exports]&&exports&&!exports.nodeType&&exports,_r=vr[typeof module]&&module&&!module.nodeType&&module,dr=_r&&_r.exports===mr&&mr,br=vr[typeof global]&&global;
!br||br.global!==br&&br.window!==br||(yr=br);var wr=[],jr=Object.prototype,xr=yr._,Er=RegExp("^"+(jr.valueOf+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$"),Tr=Math.ceil,Ar=Math.floor,Or=jr.hasOwnProperty,Rr=wr.push,Sr=jr.toString,Br=wr.unshift,Dr=Er.test(Dr=Sr.bind)&&Dr,Nr=Er.test(Nr=Object.create)&&Nr,kr=Er.test(kr=Array.isArray)&&kr,Fr=yr.isFinite,qr=yr.isNaN,Mr=Er.test(Mr=Object.keys)&&Mr,Wr=Math.max,$r=Math.min,Ir=Math.random,zr=wr.slice,Cr=Er.test(yr.attachEvent),Pr=Dr&&!/\n|true/.test(Dr+Cr);
o.prototype=u.prototype;var Ur={};!function(){var n={0:1,length:1};Ur.fastBind=Dr&&!Pr,Ur.funcDecomp=!Er.test(yr.WinRTError)&&ur.test(function(){return this}),Ur.spliceObjects=(wr.splice.call(n,0,1),!n[0])}(1),u.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,variable:""},Nr||(s=function(n){if(x(n)){e.prototype=n;var r=new e;e.prototype=null}return r||{}}),y(arguments)||(y=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Or.call(n,"callee")||!1
});var Vr=kr||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Sr.call(n)==fr||!1},Gr=function(n){var r,t=[];if(!n||!vr[typeof n])return t;for(r in n)Or.call(n,r)&&t.push(r);return t},Hr=Mr?function(n){return x(n)?Mr(n):[]}:Gr,Jr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"},Kr=b(Jr),Lr=RegExp("("+Hr(Kr).join("|")+")","g"),Qr=RegExp("["+Hr(Jr).join("")+"]","g"),Xr=function(n,r){var t;if(!n||!vr[typeof n])return n;for(t in n)if(r(n[t],t,n)===rr)break;return n},Yr=function(n,r){var t;
if(!n||!vr[typeof n])return n;for(t in n)if(Or.call(n,t)&&r(n[t],t,n)===rr)break;return n};j(/x/)&&(j=function(n){return typeof n=="function"&&"[object Function]"==Sr.call(n)});var Zr=c(function(n,r,t){Or.call(n,t)?n[t]++:n[t]=1}),nt=c(function(n,r,t){(Or.call(n,t)?n[t]:n[t]=[]).push(r)}),rt=c(function(n,r,t){n[t]=r});u.after=function(n,r){if(!j(r))throw new TypeError;return function(){return 1>--n?r.apply(this,arguments):void 0}},u.bind=J,u.bindAll=function(n){for(var r=1<arguments.length?f(arguments,!0,!1,1):d(n),t=-1,e=r.length;++t<e;){var u=r[t];
n[u]=p(n[u],1,null,null,n)}return n},u.chain=function(n){return n=new o(n),n.__chain__=!0,n},u.compact=function(n){for(var r=-1,t=n?n.length:0,e=[];++r<t;){var u=n[r];u&&e.push(u)}return e},u.compose=function(){for(var n=arguments,r=n.length;r--;)if(!j(n[r]))throw new TypeError;return function(){for(var r=arguments,t=n.length;t--;)r=[n[t].apply(this,r)];return r[0]}},u.countBy=Zr,u.debounce=L,u.defaults=_,u.defer=function(n){if(!j(n))throw new TypeError;var r=zr.call(arguments,1);return setTimeout(function(){n.apply(Z,r)
},1)},u.delay=function(n,r){if(!j(n))throw new TypeError;var t=zr.call(arguments,2);return setTimeout(function(){n.apply(Z,t)},r)},u.difference=C,u.filter=S,u.flatten=function(n,r){return f(n,r)},u.forEach=D,u.functions=d,u.groupBy=nt,u.indexBy=rt,u.initial=function(n,r,t){var e=0,u=n?n.length:0;if(typeof r!="number"&&null!=r){var o=u;for(r=K(r,t,3);o--&&r(n[o],o,n);)e++}else e=null==r||t?1:r||e;return zr.call(n,0,$r(Wr(0,u-e),u))},u.intersection=function(n){var r=arguments,t=r.length,e=-1,u=v(),o=n?n.length:0,i=[];
n:for(;++e<o;){var f=n[e];if(0>u(i,f)){for(var a=t;--a;)if(0>u(r[a],f))continue n;i.push(f)}}return i},u.invert=b,u.invoke=function(n,r){var t=zr.call(arguments,2),e=-1,u=typeof r=="function",o=n?n.length:0,i=Array(typeof o=="number"?o:0);return D(n,function(n){i[++e]=(u?r:n[r]).apply(n,t)}),i},u.keys=Hr,u.map=k,u.max=F,u.memoize=function(n,r){var t={};return function(){var e=r?r.apply(this,arguments):tr+arguments[0];return Or.call(t,e)?t[e]:t[e]=n.apply(this,arguments)}},u.min=function(n,r,t){var e=1/0,u=e,o=-1,i=n?n.length:0;
if(r||typeof i!="number")r=K(r,t,3),D(n,function(n,t,o){t=r(n,t,o),t<e&&(e=t,u=n)});else for(;++o<i;)t=n[o],t<u&&(u=t);return u},u.omit=function(n){var r=v(),t=f(arguments,!0,!1,1),e={};return Xr(n,function(n,u){0>r(t,u)&&(e[u]=n)}),e},u.once=function(n){var r,t;if(!j(n))throw new TypeError;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},u.pairs=function(n){for(var r=-1,t=Hr(n),e=t.length,u=Array(e);++r<e;){var o=t[r];u[r]=[o,n[o]]}return u},u.partial=function(n){return p(n,16,zr.call(arguments,1))
},u.pick=function(n){for(var r=-1,t=f(arguments,!0,!1,1),e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])}return u},u.pluck=q,u.range=function(n,r,t){n=+n||0,t=+t||1,null==r&&(r=n,n=0);var e=-1;r=Wr(0,Tr((r-n)/t));for(var u=Array(r);++e<r;)u[e]=n,n+=t;return u},u.reject=function(n,r,t){return r=K(r,t,3),S(n,function(n,t,e){return!r(n,t,e)})},u.rest=V,u.shuffle=$,u.sortBy=function(n,t,e){var u=-1,o=n?n.length:0,i=Array(typeof o=="number"?o:0);for(t=K(t,e,3),D(n,function(n,r,e){i[++u]={l:t(n,r,e),m:u,n:n}
}),o=i.length,i.sort(r);o--;)i[o]=i[o].n;return i},u.tap=function(n,r){return r(n),n},u.throttle=function(n,r,t){var e=!0,u=!0;if(!j(n))throw new TypeError;return false===t?e=!1:x(t)&&(e="leading"in t?t.leading:e,u="trailing"in t?t.trailing:u),t={},t.leading=e,t.maxWait=r,t.trailing=u,L(n,r,t)},u.times=function(n,r,t){n=-1<(n=+n)?n:0;var e=-1,u=Array(n);for(r=i(r,t,1);++e<n;)u[e]=r(e);return u},u.toArray=function(n){return Vr(n)?zr.call(n):n&&typeof n.length=="number"?k(n):A(n)},u.union=function(){return l(f(arguments,!0,!0))
},u.uniq=H,u.values=A,u.where=z,u.without=function(n){return C(n,zr.call(arguments,1))},u.wrap=function(n,r){if(!j(r))throw new TypeError;return function(){var t=[n];return Rr.apply(t,arguments),r.apply(this,t)}},u.zip=function(){for(var n=-1,r=F(q(arguments,"length")),t=Array(0>r?0:r);++n<r;)t[n]=q(arguments,n);return t},u.collect=k,u.drop=V,u.each=D,u.extend=m,u.methods=d,u.object=function(n,r){for(var t=-1,e=n?n.length:0,u={};++t<e;){var o=n[t];r?u[o]=r[t]:o&&(u[o[0]]=o[1])}return u},u.select=S,u.tail=V,u.unique=H,u.clone=function(n){return x(n)?Vr(n)?zr.call(n):m({},n):n
},u.contains=O,u.escape=function(n){return null==n?"":(n+"").replace(Qr,h)},u.every=R,u.find=B,u.has=function(n,r){return n?Or.call(n,r):!1},u.identity=Q,u.indexOf=U,u.isArguments=y,u.isArray=Vr,u.isBoolean=function(n){return true===n||false===n||Sr.call(n)==ar},u.isDate=function(n){return n?typeof n=="object"&&Sr.call(n)==lr:!1},u.isElement=function(n){return n?1===n.nodeType:!1},u.isEmpty=w,u.isEqual=function(n,r){return a(n,r)},u.isFinite=function(n){return Fr(n)&&!qr(parseFloat(n))},u.isFunction=j,u.isNaN=function(n){return E(n)&&n!=+n
},u.isNull=function(n){return null===n},u.isNumber=E,u.isObject=x,u.isRegExp=function(n){return n&&vr[typeof n]?Sr.call(n)==sr:!1},u.isString=T,u.isUndefined=function(n){return typeof n=="undefined"},u.lastIndexOf=function(n,r,t){var e=n?n.length:0;for(typeof t=="number"&&(e=(0>t?Wr(0,e+t):$r(t,e-1))+1);e--;)if(n[e]===r)return e;return-1},u.mixin=X,u.noConflict=function(){return yr._=xr,this},u.random=Y,u.reduce=M,u.reduceRight=W,u.result=function(n,r){if(n){var t=n[r];return j(t)?n[r]():t}},u.size=function(n){var r=n?n.length:0;
return typeof r=="number"?r:Hr(n).length},u.some=I,u.sortedIndex=G,u.template=function(n,r,e){var o=u,i=o.templateSettings;n||(n=""),e=_({},e,i);var f=0,a="__p+='",i=e.variable;n.replace(RegExp((e.escape||er).source+"|"+(e.interpolate||er).source+"|"+(e.evaluate||er).source+"|$","g"),function(r,e,u,o,i){return a+=n.slice(f,i).replace(or,t),e&&(a+="'+_.escape("+e+")+'"),o&&(a+="';"+o+";__p+='"),u&&(a+="'+((__t=("+u+"))==null?'':__t)+'"),f=i+r.length,r}),a+="';\n",i||(i="obj",a="with("+i+"||{}){"+a+"}"),a="function("+i+"){var __t,__p='',__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}"+a+"return __p}";
try{var l=Function("_","return "+a)(o)}catch(c){throw c.source=a,c}return r?l(r):(l.source=a,l)},u.unescape=function(n){return null==n?"":(n+"").replace(Lr,g)},u.uniqueId=function(n){var r=++nr+"";return n?n+r:r},u.all=R,u.any=I,u.detect=B,u.findWhere=function(n,r){return z(n,r,!0)},u.foldl=M,u.foldr=W,u.include=O,u.inject=M,u.first=P,u.last=function(n,r,t){var e=0,u=n?n.length:0;if(typeof r!="number"&&null!=r){var o=u;for(r=K(r,t,3);o--&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[u-1]:Z;
return zr.call(n,Wr(0,u-e))},u.sample=function(n,r,t){var e=n?n.length:0;return typeof e!="number"&&(n=A(n)),null==r||t?n?n[Y(e-1)]:Z:(n=$(n),n.length=$r(Wr(0,r),n.length),n)},u.take=P,u.head=P,X(u),u.VERSION="2.1.0",u.prototype.chain=function(){return this.__chain__=!0,this},u.prototype.value=function(){return this.__wrapped__},D("pop push reverse shift sort splice unshift".split(" "),function(n){var r=wr[n];u.prototype[n]=function(){var n=this.__wrapped__;return r.apply(n,arguments),Ur.spliceObjects||0!==n.length||delete n[0],this
}}),D(["concat","join","slice"],function(n){var r=wr[n];u.prototype[n]=function(){var n=r.apply(this.__wrapped__,arguments);return this.__chain__&&(n=new o(n),n.__chain__=!0),n}}),typeof define=="function"&&typeof define.amd=="object"&&define.amd?(yr._=u, define(function(){return u})):mr&&_r?dr?(_r.exports=u)._=u:mr._=u:yr._=u}).call(this);