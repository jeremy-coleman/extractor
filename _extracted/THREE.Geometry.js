/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */
class EventDispatcher {
    constructor() { }
    addEventListener(type, listener) {
        if (this._listeners === undefined)
            this._listeners = {};
        let listeners = this._listeners;
        if (listeners[type] === undefined)
            listeners[type] = [];
        if (listeners[type].indexOf(listener) === -1)
            listeners[type].push(listener);
    }
    hasEventListener(type, listener) {
        if (this._listeners === undefined)
            return false;
        let listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    }
    removeEventListener(type, listener) {
        if (this._listeners === undefined)
            return;
        let listeners = this._listeners;
        let listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            let index = listenerArray.indexOf(listener);
            if (index !== -1)
                listenerArray.splice(index, 1);
        }
    }
    dispatchEvent(event) {
        if (this._listeners === undefined)
            return;
        let listeners = this._listeners;
        let listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            let array = listenerArray.slice(0);
            for (let i = 0, l = array.length; i < l; i++)
                array[i].call(this, event);
        }
    }
}

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
class _Math {
    static generateUUID() {
        if (_Math.lut == undefined) {
            _Math.lut = [];
            for (let i = 0; i < 256; i++)
                _Math.lut[i] = (i < 16 ? '0' : '') + (i).toString(16).toUpperCase();
        }
        let lut = _Math.lut;
        let d0 = Math.random() * 0xffffffff | 0;
        let d1 = Math.random() * 0xffffffff | 0;
        let d2 = Math.random() * 0xffffffff | 0;
        let d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }
    ;
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    ;
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation
    static euclideanModulo(n, m) {
        return ((n % m) + m) % m;
    }
    // Linear mapping from range <a1, a2> to range <b1, b2>
    static mapLinear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }
    // https://en.wikipedia.org/wiki/Linear_interpolation
    static lerp(x, y, t) {
        return (1 - t) * x + t * y;
    }
    // http://en.wikipedia.org/wiki/Smoothstep
    static smoothstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }
    static smootherstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    // Random integer from <low, high> interval
    static randInt(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
    // Random float from <low, high> interval
    static randFloat(low, high) {
        return low + Math.random() * (high - low);
    }
    // Random float from <-range/2, range/2> interval
    static randFloatSpread(range) {
        return range * (0.5 - Math.random());
    }
    static degToRad(degrees) {
        return degrees * _Math.DEG2RAD;
    }
    static radToDeg(radians) {
        return radians * _Math.RAD2DEG;
    }
    static isPowerOfTwo(value) {
        return (value & (value - 1)) === 0 && value !== 0;
    }
    static ceilPowerOfTwo(value) {
        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    }
    static floorPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    }
}
_Math.DEG2RAD = Math.PI / 180;
_Math.RAD2DEG = 180 / Math.PI;

/**
 * @author mrdoob / http://mrdoob.com/
 */
let ColorKeywords = {
    'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
    'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
    'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
    'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
    'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
    'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
};
class Color {
    constructor(r, g, b) {
        this.r = 1;
        this.g = 1;
        this.b = 1;
        if (g === undefined || b === undefined) {
            return this.set(r); // r is THREE.Color, hex or string
        }
        return this.setRGB(r, g, b);
    }
    set(value) {
        if (value && value instanceof Color)
            this.copy(value);
        else if (typeof value === 'number')
            this.setHex(value);
        else if (typeof value === 'string')
            this.setStyle(value);
        return this;
    }
    setScalar(scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
        return this;
    }
    setHex(hex) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        return this;
    }
    setRGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
    hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * 6 * (2 / 3 - t);
        return p;
    }
    setHSL(h, s, l) {
        // h,s,l ranges are in 0.0 - 1.0
        h = _Math.euclideanModulo(h, 1);
        s = _Math.clamp(s, 0, 1);
        l = _Math.clamp(l, 0, 1);
        if (s === 0)
            this.r = this.g = this.b = l;
        else {
            let p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
            let q = (2 * l) - p;
            this.r = this.hue2rgb(q, p, h + 1 / 3);
            this.g = this.hue2rgb(q, p, h);
            this.b = this.hue2rgb(q, p, h - 1 / 3);
        }
        return this;
    }
    handleAlpha(str) {
        if (str === undefined)
            return;
        if (parseFloat(str) < 1)
            console.warn('THREE.Color: Alpha component of ' + this.style + ' will be ignored.');
    }
    setStyle(style) {
        this.style = style;
        let m;
        if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
            // rgb / hsl
            let color;
            let name = m[1];
            let components = m[2];
            switch (name) {
                case 'rgb':
                case 'rgba':
                    if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // rgb(255,0,0) rgba(255,0,0,0.5)
                        this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                        this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                        this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                        this.handleAlpha(color[5]);
                        return this;
                    }
                    if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                        this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                        this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                        this.b = Math.min(100, parseInt(color[3], 10)) / 100;
                        this.handleAlpha(color[5]);
                        return this;
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                        let h = parseFloat(color[1]) / 360;
                        let s = parseInt(color[2], 10) / 100;
                        let l = parseInt(color[3], 10) / 100;
                        this.handleAlpha(color[5]);
                        return this.setHSL(h, s, l);
                    }
                    break;
            }
        }
        else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
            // hex color
            let hex = m[1];
            let size = hex.length;
            if (size === 3) {
                // #ff0
                this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
                return this;
            }
            else if (size === 6) {
                // #ff0000
                this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
                return this;
            }
        }
        if (style && style.length > 0) {
            // color keywords
            let hex = ColorKeywords[style];
            if (hex !== undefined) {
                // red
                this.setHex(hex);
            }
            else {
                // unknown color
                console.warn('THREE.Color: Unknown color ' + style);
            }
        }
        return this;
    }
    clone() {
        return new Color(this.r, this.g, this.b);
    }
    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    }
    copyGammaToLinear(color, gammaFactor) {
        if (gammaFactor === undefined)
            gammaFactor = 2.0;
        this.r = Math.pow(color.r, gammaFactor);
        this.g = Math.pow(color.g, gammaFactor);
        this.b = Math.pow(color.b, gammaFactor);
        return this;
    }
    copyLinearToGamma(color, gammaFactor) {
        if (gammaFactor === undefined)
            gammaFactor = 2.0;
        let safeInverse = (gammaFactor > 0) ? (1.0 / gammaFactor) : 1.0;
        this.r = Math.pow(color.r, safeInverse);
        this.g = Math.pow(color.g, safeInverse);
        this.b = Math.pow(color.b, safeInverse);
        return this;
    }
    convertGammaToLinear() {
        let r = this.r, g = this.g, b = this.b;
        this.r = r * r;
        this.g = g * g;
        this.b = b * b;
        return this;
    }
    convertLinearToGamma() {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this;
    }
    getHex() {
        return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
    }
    getHexString() {
        return ('000000' + this.getHex().toString(16)).slice(-6);
    }
    getHSL(optionalTarget) {
        // h,s,l ranges are in 0.0 - 1.0
        let hsl = optionalTarget || { h: 0, s: 0, l: 0 };
        let r = this.r, g = this.g, b = this.b;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let hue, saturation;
        let lightness = (min + max) / 2.0;
        if (min === max) {
            hue = 0;
            saturation = 0;
        }
        else {
            let delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch (max) {
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        hsl.h = hue;
        hsl.s = saturation;
        hsl.l = lightness;
        return hsl;
    }
    getStyle() {
        return 'rgb(' + ((this.r * 255) | 0) + ',' + //
            ((this.g * 255) | 0) + ',' + //
            ((this.b * 255) | 0) + ')';
    }
    offsetHSL(h, s, l) {
        let hsl = this.getHSL();
        hsl.h += h;
        hsl.s += s;
        hsl.l += l;
        this.setHSL(hsl.h, hsl.s, hsl.l);
        return this;
    }
    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }
    addColors(color1, color2) {
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;
        return this;
    }
    addScalar(s) {
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    }
    sub(color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    }
    multiply(color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    }
    multiplyScalar(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    }
    lerp(color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        return this;
    }
    equals(c) {
        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);
    }
    fromArray(array, offset = 0) {
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];
        return this;
    }
    toArray(array, offset = 0) {
        if (array === undefined)
            array = [];
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }
    toJSON() {
        return this.getHex();
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */
class Matrix4 {
    constructor() {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        if (arguments.length > 0)
            console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
    }
    set(n11, n12, n13, n14, //
    n21, n22, n23, n24, //
    n31, n32, n33, n34, //
    n41, n42, n43, n44) {
        let te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    clone() {
        return new Matrix4().fromArray(this.elements);
    }
    copy(m) {
        let te = this.elements;
        let me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        te[9] = me[9];
        te[10] = me[10];
        te[11] = me[11];
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        te[15] = me[15];
        return this;
    }
    copyPosition(m) {
        let te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this;
    }
    makeBasis(xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this;
    }
    extractRotation(m) {
        let v1 = new Vector3();
        let te = this.elements;
        let me = m.elements;
        let scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
        let scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
        let scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        return this;
    }
    ;
    makeRotationFromEuler(euler) {
        if (!euler)
            console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
        let te = this.elements;
        let x = euler.x, y = euler.y, z = euler.z;
        let a = Math.cos(x), b = Math.sin(x);
        let c = Math.cos(y), d = Math.sin(y);
        let e = Math.cos(z), f = Math.sin(z);
        if (euler.order === 'XYZ') {
            let ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        }
        else if (euler.order === 'YXZ') {
            let ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        }
        else if (euler.order === 'ZXY') {
            let ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;
            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        }
        else if (euler.order === 'ZYX') {
            let ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;
            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        }
        else if (euler.order === 'YZX') {
            let ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        }
        else if (euler.order === 'XZY') {
            let ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;
            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }
        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    makeRotationFromQuaternion(q) {
        let te = this.elements;
        let x = q.x, y = q.y, z = q.z, w = q.w;
        let x2 = x + x, y2 = y + y, z2 = z + z;
        let xx = x * x2, xy = x * y2, xz = x * z2;
        let yy = y * y2, yz = y * z2, zz = z * z2;
        let wx = w * x2, wy = w * y2, wz = w * z2;
        te[0] = 1 - (yy + zz);
        te[4] = xy - wz;
        te[8] = xz + wy;
        te[1] = xy + wz;
        te[5] = 1 - (xx + zz);
        te[9] = yz - wx;
        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - (xx + yy);
        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    lookAt(eye, target, up) {
        let x = new Vector3();
        let y = new Vector3();
        let z = new Vector3();
        let te = this.elements;
        z.subVectors(eye, target);
        if (z.lengthSq() === 0) {
            // eye and target are in the same position
            z.z = 1;
        }
        z.normalize();
        x.crossVectors(up, z);
        if (x.lengthSq() === 0) {
            // up and z are parallel
            if (Math.abs(up.z) === 1)
                z.x += 0.0001;
            else
                z.z += 0.0001;
            z.normalize();
            x.crossVectors(up, z);
        }
        x.normalize();
        y.crossVectors(z, x);
        te[0] = x.x;
        te[4] = y.x;
        te[8] = z.x;
        te[1] = x.y;
        te[5] = y.y;
        te[9] = z.y;
        te[2] = x.z;
        te[6] = y.z;
        te[10] = z.z;
        return this;
    }
    multiply(m, n) {
        if (n !== undefined) {
            console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
            return this.multiplyMatrices(m, n);
        }
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        let ae = a.elements;
        let be = b.elements;
        let te = this.elements;
        let a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        let a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        let a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        let a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
        let b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        let b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        let b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        let b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this;
    }
    multiplyScalar(s) {
        let te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    }
    applyToBufferAttribute(attribute) {
        let v1 = new Vector3();
        for (let i = 0, l = attribute.count; i < l; i++) {
            v1.x = attribute.getX(i);
            v1.y = attribute.getY(i);
            v1.z = attribute.getZ(i);
            v1.applyMatrix4(this);
            attribute.setXYZ(i, v1.x, v1.y, v1.z);
        }
        return attribute;
    }
    determinant() {
        let te = this.elements;
        let n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        let n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        let n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        let n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        //TODO: make this more efficient
        //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
        return (n41 * (+n14 * n23 * n32
            - n13 * n24 * n32
            - n14 * n22 * n33
            + n12 * n24 * n33
            + n13 * n22 * n34
            - n12 * n23 * n34) +
            n42 * (+n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31) +
            n43 * (+n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31) +
            n44 * (-n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31));
    }
    transpose() {
        let te = this.elements;
        let tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    }
    setPosition(v) {
        let te = this.elements;
        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;
        return this;
    }
    getInverse(m, throwOnDegenerate = true) {
        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        let te = this.elements, me = m.elements, n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3], n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7], n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11], n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        let det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (det === 0) {
            let msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
            if (throwOnDegenerate === true)
                throw new Error(msg);
            else
                console.warn(msg);
            return this.identity();
        }
        let detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
        return this;
    }
    scale(v) {
        let te = this.elements;
        let x = v.x, y = v.y, z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    }
    getMaxScaleOnAxis() {
        let te = this.elements;
        let scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        let scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        let scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
    makeTranslation(x, y, z) {
        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this;
    }
    makeRotationX(theta) {
        let c = Math.cos(theta), s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationY(theta) {
        let c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationZ(theta) {
        let c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationAxis(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let t = 1 - c;
        let x = axis.x, y = axis.y, z = axis.z;
        let tx = t * x, ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
    }
    makeScale(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    }
    makeShear(x, y, z) {
        this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
        return this;
    }
    compose(position, quaternion, scale) {
        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this;
    }
    decompose(position, quaternion, scale) {
        let vector = new Vector3();
        let matrix = new Matrix4();
        let te = this.elements;
        let sx = vector.set(te[0], te[1], te[2]).length();
        let sy = vector.set(te[4], te[5], te[6]).length();
        let sz = vector.set(te[8], te[9], te[10]).length();
        // if determine is negative, we need to invert one scale
        let det = this.determinant();
        if (det < 0)
            sx = -sx;
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        // scale the rotation part
        matrix.copy(this);
        let invSX = 1 / sx;
        let invSY = 1 / sy;
        let invSZ = 1 / sz;
        matrix.elements[0] *= invSX;
        matrix.elements[1] *= invSX;
        matrix.elements[2] *= invSX;
        matrix.elements[4] *= invSY;
        matrix.elements[5] *= invSY;
        matrix.elements[6] *= invSY;
        matrix.elements[8] *= invSZ;
        matrix.elements[9] *= invSZ;
        matrix.elements[10] *= invSZ;
        quaternion.setFromRotationMatrix(matrix);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    }
    makePerspective(left, right, top, bottom, near, far) {
        if (far === undefined)
            console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
        let te = this.elements;
        let x = 2 * near / (right - left);
        let y = 2 * near / (top - bottom);
        let a = (right + left) / (right - left);
        let b = (top + bottom) / (top - bottom);
        let c = -(far + near) / (far - near);
        let d = -2 * far * near / (far - near);
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this;
    }
    makeOrthographic(left, right, top, bottom, near, far) {
        let te = this.elements;
        let w = 1.0 / (right - left);
        let h = 1.0 / (top - bottom);
        let p = 1.0 / (far - near);
        let x = (right + left) * w;
        let y = (top + bottom) * h;
        let z = (far + near) * p;
        te[0] = 2 * w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 * h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = -2 * p;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this;
    }
    equals(matrix) {
        let te = this.elements;
        let me = matrix.elements;
        for (let i = 0; i < 16; i++)
            if (te[i] !== me[i])
                return false;
        return true;
    }
    fromArray(array, offset = 0) {
        for (let i = 0; i < 16; i++)
            this.elements[i] = array[i + offset];
        return this;
    }
    toArray(array, offset = 0) {
        if (array === undefined)
            array = [];
        let te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    }
}

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */
class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.onChangeCallback = () => { };
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    //	slerp( qa, qb, qm, t )
    //	{
    //		return qm.copy( qa ).slerp( qb, t );
    //	}
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        // fuzz-free, array-based Quaternion SLERP operation
        let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3], x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
            let s = 1 - t, cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = (cos >= 0 ? 1 : -1), sqrSin = 1 - cos * cos;
            // Skip the Slerp for tiny steps to avoid numeric problems:
            if (sqrSin > Number.EPSILON) {
                let sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
                s = Math.sin(s * len) / sin;
                t = Math.sin(t * len) / sin;
            }
            let tDir = t * dir;
            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;
            // Normalize in case we just did a lerp:
            if (s === 1 - t) {
                let f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;
            }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this.onChangeCallback();
    }
    get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this.onChangeCallback();
    }
    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this.onChangeCallback();
        return this;
    }
    clone() {
        return new Quaternion(this._x, this._y, this._z, this._w);
    }
    copy(quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this.onChangeCallback();
        return this;
    }
    setFromEuler(euler, update = true) {
        if (!(euler instanceof Euler))
            throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
        let x = euler.x, y = euler.y, z = euler.z, order = euler.order;
        // http://www.mathworks.com/matlabcentral/fileexchange/
        // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //	content/SpinCalc.m
        let cos = Math.cos;
        let sin = Math.sin;
        let c1 = cos(x / 2);
        let c2 = cos(y / 2);
        let c3 = cos(z / 2);
        let s1 = sin(x / 2);
        let s2 = sin(y / 2);
        let s3 = sin(z / 2);
        if (order === 'XYZ') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'YXZ') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        else if (order === 'ZXY') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'ZYX') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        else if (order === 'YZX') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'XZY') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        if (update)
            this.onChangeCallback();
        return this;
    }
    setFromAxisAngle(axis, angle) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
        // assumes axis is normalized
        let halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this.onChangeCallback();
        return this;
    }
    setFromRotationMatrix(m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        let te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33, s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s;
            this._x = 0.25 * s;
            this._y = (m12 + m21) / s;
            this._z = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s;
            this._x = (m12 + m21) / s;
            this._y = 0.25 * s;
            this._z = (m23 + m32) / s;
        }
        else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s;
            this._x = (m13 + m31) / s;
            this._y = (m23 + m32) / s;
            this._z = 0.25 * s;
        }
        this.onChangeCallback();
        return this;
    }
    // assumes direction vectors vFrom and vTo are normalized
    setFromUnitVectors(vFrom, vTo) {
        let v1 = new Vector3();
        let r = vFrom.dot(vTo) + 1;
        let EPS = 0.000001;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z))
                v1.set(-vFrom.y, vFrom.x, 0);
            else
                v1.set(0, -vFrom.z, vFrom.y);
        }
        else
            v1.crossVectors(vFrom, vTo);
        this._x = v1.x;
        this._y = v1.y;
        this._z = v1.z;
        this._w = r;
        return this.normalize();
    }
    inverse() {
        return this.conjugate().normalize();
    }
    conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this.onChangeCallback();
        return this;
    }
    dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
        let l = this.length();
        if (l === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        }
        else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        this.onChangeCallback();
        return this;
    }
    multiply(q) {
        return this.multiplyQuaternions(this, q);
    }
    premultiply(q) {
        return this.multiplyQuaternions(q, this);
    }
    multiplyQuaternions(a, b) {
        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
        let qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        let qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this.onChangeCallback();
        return this;
    }
    slerp(qb, t) {
        if (t === 0)
            return this;
        if (t === 1)
            return this.copy(qb);
        let x = this._x, y = this._y, z = this._z, w = this._w;
        // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
        let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
            this._w = -qb._w;
            this._x = -qb._x;
            this._y = -qb._y;
            this._z = -qb._z;
            cosHalfTheta = -cosHalfTheta;
        }
        else
            this.copy(qb);
        if (cosHalfTheta >= 1.0) {
            this._w = w;
            this._x = x;
            this._y = y;
            this._z = z;
            return this;
        }
        let sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
            this._w = 0.5 * (w + this._w);
            this._x = 0.5 * (x + this._x);
            this._y = 0.5 * (y + this._y);
            this._z = 0.5 * (z + this._z);
            return this;
        }
        let halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        let ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = (w * ratioA + this._w * ratioB);
        this._x = (x * ratioA + this._x * ratioB);
        this._y = (y * ratioA + this._y * ratioB);
        this._z = (z * ratioA + this._z * ratioB);
        this.onChangeCallback();
        return this;
    }
    equals(quaternion) {
        return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);
    }
    fromArray(array, offset) {
        if (offset === undefined)
            offset = 0;
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this.onChangeCallback();
        return this;
    }
    toArray(array, offset = 0) {
        if (array === undefined)
            array = [];
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    }
    onChange(callback) {
        this.onChangeCallback = callback;
        return this;
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */
class Euler {
    constructor(x = 0, y = 0, z = 0, order = Euler.DefaultOrder) {
        this.onChangeCallback = () => { };
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this.onChangeCallback();
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
        this.onChangeCallback();
    }
    set(x, y, z, order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order || this._order;
        this.onChangeCallback();
        return this;
    }
    clone() {
        return new Euler(this._x, this._y, this._z, this._order);
    }
    copy(euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this.onChangeCallback();
        return this;
    }
    /**set euler from rotation matrix*/
    setFromRotationMatrix(m, order, update) {
        var clamp = _Math.clamp;
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var te = m.elements;
        var m11 = te[0], m12 = te[4], m13 = te[8];
        var m21 = te[1], m22 = te[5], m23 = te[9];
        var m31 = te[2], m32 = te[6], m33 = te[10];
        order = order || this._order;
        if (order === 'XYZ') {
            this._y = Math.asin(clamp(m13, -1, 1));
            if (Math.abs(m13) < 0.99999) {
                this._x = Math.atan2(-m23, m33);
                this._z = Math.atan2(-m12, m11);
            }
            else {
                this._x = Math.atan2(m32, m22);
                this._z = 0;
            }
        }
        else if (order === 'YXZ') {
            this._x = Math.asin(-clamp(m23, -1, 1));
            if (Math.abs(m23) < 0.99999) {
                this._y = Math.atan2(m13, m33);
                this._z = Math.atan2(m21, m22);
            }
            else {
                this._y = Math.atan2(-m31, m11);
                this._z = 0;
            }
        }
        else if (order === 'ZXY') {
            this._x = Math.asin(clamp(m32, -1, 1));
            if (Math.abs(m32) < 0.99999) {
                this._y = Math.atan2(-m31, m33);
                this._z = Math.atan2(-m12, m22);
            }
            else {
                this._y = 0;
                this._z = Math.atan2(m21, m11);
            }
        }
        else if (order === 'ZYX') {
            this._y = Math.asin(-clamp(m31, -1, 1));
            if (Math.abs(m31) < 0.99999) {
                this._x = Math.atan2(m32, m33);
                this._z = Math.atan2(m21, m11);
            }
            else {
                this._x = 0;
                this._z = Math.atan2(-m12, m22);
            }
        }
        else if (order === 'YZX') {
            this._z = Math.asin(clamp(m21, -1, 1));
            if (Math.abs(m21) < 0.99999) {
                this._x = Math.atan2(-m23, m22);
                this._y = Math.atan2(-m31, m11);
            }
            else {
                this._x = 0;
                this._y = Math.atan2(m13, m33);
            }
        }
        else if (order === 'XZY') {
            this._z = Math.asin(-clamp(m12, -1, 1));
            if (Math.abs(m12) < 0.99999) {
                this._x = Math.atan2(m32, m22);
                this._y = Math.atan2(m13, m11);
            }
            else {
                this._x = Math.atan2(-m23, m33);
                this._y = 0;
            }
        }
        else {
            console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
        }
        this._order = order;
        if (update !== false)
            this.onChangeCallback();
        return this;
    }
    setFromQuaternion(q, order, update = true) {
        var matrix = new Matrix4();
        matrix.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(matrix, order, update);
    }
    ;
    setFromVector3(v, order) {
        return this.set(v.x, v.y, v.z, order || this._order);
    }
    // WARNING: this discards revolution information -bhouston
    reorder(newOrder) {
        var q = new Quaternion();
        q.setFromEuler(this);
        return this.setFromQuaternion(q, newOrder);
    }
    ;
    equals(euler) {
        return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);
    }
    fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        if (array[3] !== undefined)
            this._order = array[3];
        this.onChangeCallback();
        return this;
    }
    toArray(array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;
        return array;
    }
    toVector3(optionalResult) {
        if (optionalResult)
            return optionalResult.set(this._x, this._y, this._z);
        else
            return new Vector3(this._x, this._y, this._z);
    }
    onChange(callback) {
        this.onChangeCallback = callback;
        return this;
    }
}
Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.isVector3 = true;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    setComponent(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    add(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);
        }
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }
    sub(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);
        }
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }
    multiply(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
            return this.multiplyVectors(v, w);
        }
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }
    applyEuler(euler) {
        let quaternion = new Quaternion();
        if (!(euler instanceof Euler))
            console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
        return this.applyQuaternion(quaternion.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
        let quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(m) {
        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }
    applyMatrix4(m) {
        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;
        let w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
    }
    applyQuaternion(q) {
        let x = this.x, y = this.y, z = this.z;
        let qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        // calculate quat * vector
        let ix = qw * x + qy * z - qz * y;
        let iy = qw * y + qz * x - qx * z;
        let iz = qw * z + qx * y - qy * x;
        let iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }
    project(camera) {
        let matrix = new Matrix4();
        matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
        return this.applyMatrix4(matrix);
    }
    unproject(camera) {
        let matrix = new Matrix4();
        matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
        return this.applyMatrix4(matrix);
    }
    transformDirection(m) {
        // input: THREE.Matrix4 affine matrix
        // vector interpreted as a direction
        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }
    clamp(min, max) {
        // assumes min < max, componentwise
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }
    clampScalar(minVal, maxVal) {
        let min = new Vector3();
        let max = new Vector3();
        min.set(minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal);
        return this.clamp(min, max);
    }
    clampLength(min, max) {
        let length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    roundToZero() {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    // TODO lengthSquared?
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
    cross(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
            return this.crossVectors(v, w);
        }
        return this.crossVectors(this, v);
    }
    crossVectors(a, b) {
        let ax = a.x, ay = a.y, az = a.z;
        let bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    projectOnVector(vector) {
        let scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar);
    }
    projectOnPlane(planeNormal) {
        let v1 = new Vector3();
        v1.copy(this).projectOnVector(planeNormal);
        return this.sub(v1);
    }
    ;
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length
    reflect(normal) {
        let v1 = new Vector3();
        return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    angleTo(v) {
        let theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        return Math.acos(_Math.clamp(theta, -1, 1));
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        let dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    setFromSpherical(s) {
        let sinPhiRadius = Math.sin(s.phi) * s.radius;
        this.x = sinPhiRadius * Math.sin(s.theta);
        this.y = Math.cos(s.phi) * s.radius;
        this.z = sinPhiRadius * Math.cos(s.theta);
        return this;
    }
    setFromCylindrical(c) {
        this.x = c.radius * Math.sin(c.theta);
        this.y = c.y;
        this.z = c.radius * Math.cos(c.theta);
        return this;
    }
    setFromMatrixPosition(m) {
        let e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }
    setFromMatrixScale(m) {
        let sx = this.setFromMatrixColumn(m, 0).length();
        let sy = this.setFromMatrixColumn(m, 1).length();
        let sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }
    setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, index * 4);
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }
    toArray(array, offset = 0) {
        if (array === undefined)
            array = [];
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
class Face3 {
    constructor(a = 0, b = 0, c = 0, normal, color, materialIndex = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.normal = (normal instanceof Vector3) ? normal : new Vector3();
        this.vertexNormals = Array.isArray(normal) ? normal : [];
        this.color = (color instanceof Color) ? color : new Color();
        this.vertexColors = Array.isArray(color) ? color : [];
        this.materialIndex = materialIndex;
    }
    clone() {
        return new Face3().copy(this);
    }
    copy(source) {
        this.a = source.a;
        this.b = source.b;
        this.c = source.c;
        this.normal.copy(source.normal);
        this.color.copy(source.color);
        this.materialIndex = source.materialIndex;
        for (var i = 0, il = source.vertexNormals.length; i < il; i++)
            this.vertexNormals[i] = source.vertexNormals[i].clone();
        for (var i = 0, il = source.vertexColors.length; i < il; i++)
            this.vertexColors[i] = source.vertexColors[i].clone();
        return this;
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 */
class Layers {
    constructor() {
        this.mask = 1 | 0;
    }
    set(channel) {
        this.mask = 1 << channel | 0;
    }
    enable(channel) {
        this.mask |= 1 << channel | 0;
    }
    toggle(channel) {
        this.mask ^= 1 << channel | 0;
    }
    disable(channel) {
        this.mask &= ~(1 << channel | 0);
    }
    test(layers) {
        return (this.mask & layers.mask) !== 0;
    }
}

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */
class Matrix3 {
    constructor() {
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
        if (arguments.length > 0)
            console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        let te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
    }
    clone() {
        return new Matrix3().fromArray(this.elements);
    }
    copy(m) {
        let te = this.elements;
        let me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        return this;
    }
    setFromMatrix4(m) {
        let me = m.elements;
        this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
        return this;
    }
    applyToBufferAttribute(attribute) {
        let v1 = new Vector3();
        for (let i = 0, l = attribute.count; i < l; i++) {
            v1.x = attribute.getX(i);
            v1.y = attribute.getY(i);
            v1.z = attribute.getZ(i);
            v1.applyMatrix3(this);
            attribute.setXYZ(i, v1.x, v1.y, v1.z);
        }
        return attribute;
    }
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        let ae = a.elements;
        let be = b.elements;
        let te = this.elements;
        let a11 = ae[0], a12 = ae[3], a13 = ae[6];
        let a21 = ae[1], a22 = ae[4], a23 = ae[7];
        let a31 = ae[2], a32 = ae[5], a33 = ae[8];
        let b11 = be[0], b12 = be[3], b13 = be[6];
        let b21 = be[1], b22 = be[4], b23 = be[7];
        let b31 = be[2], b32 = be[5], b33 = be[8];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    }
    multiplyScalar(s) {
        let te = this.elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    }
    determinant() {
        let te = this.elements;
        let a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
    getInverse(matrix, throwOnDegenerate = false) {
        let me = matrix.elements, te = this.elements, n11 = me[0], n21 = me[1], n31 = me[2], n12 = me[3], n22 = me[4], n32 = me[5], n13 = me[6], n23 = me[7], n33 = me[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
        if (det === 0) {
            let msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
            if (throwOnDegenerate === true)
                throw new Error(msg);
            else
                console.warn(msg);
            return this.identity();
        }
        let detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;
        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;
        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;
        return this;
    }
    transpose() {
        let tmp, m = this.elements;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    }
    getNormalMatrix(matrix4) {
        return this.setFromMatrix4(matrix4).getInverse(this).transpose();
    }
    transposeIntoArray(r) {
        let m = this.elements;
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return this;
    }
    //(txy:translate, sxy:scale, rotation, cxy:center)
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
        let c = Math.cos(rotation);
        let s = Math.sin(rotation);
        this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
    }
    scale(sx, sy) {
        let te = this.elements;
        te[0] *= sx;
        te[3] *= sx;
        te[6] *= sx;
        te[1] *= sy;
        te[4] *= sy;
        te[7] *= sy;
        return this;
    }
    rotate(theta) {
        let c = Math.cos(theta);
        let s = Math.sin(theta);
        let te = this.elements;
        let a11 = te[0], a12 = te[3], a13 = te[6];
        let a21 = te[1], a22 = te[4], a23 = te[7];
        te[0] = c * a11 + s * a21;
        te[3] = c * a12 + s * a22;
        te[6] = c * a13 + s * a23;
        te[1] = -s * a11 + c * a21;
        te[4] = -s * a12 + c * a22;
        te[7] = -s * a13 + c * a23;
        return this;
    }
    translate(tx, ty) {
        let te = this.elements;
        te[0] += tx * te[2];
        te[3] += tx * te[5];
        te[6] += tx * te[8];
        te[1] += ty * te[2];
        te[4] += ty * te[5];
        te[7] += ty * te[8];
        return this;
    }
    equals(matrix) {
        let te = this.elements;
        let me = matrix.elements;
        for (let i = 0; i < 9; i++)
            if (te[i] !== me[i])
                return false;
        return true;
    }
    fromArray(array, offset = 0) {
        for (let i = 0; i < 9; i++)
            this.elements[i] = array[i + offset];
        return this;
    }
    toArray(array, offset = 0) {
        if (array === undefined)
            array = [];
        let te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        return array;
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
class Camera extends Object3D {
    constructor() {
        super();
        this.type = 'Camera';
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();
    }
    copy(source, recursive = true) {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        return this;
    }
    getWorldDirection(optionalTarget) {
        var quaternion = new Quaternion();
        var result = optionalTarget || new Vector3();
        this.getWorldQuaternion(quaternion);
        return result.set(0, 0, -1).applyQuaternion(quaternion);
    }
    updateMatrixWorld(force) {
        Object3D.prototype.updateMatrixWorld.call(this, force);
        this.matrixWorldInverse.getInverse(this.matrixWorld);
    }
    clone() {
        return new Camera().copy(this);
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author elephantatwork / www.elephantatwork.ch
 */
let object3DId = 0;
class Object3D extends EventDispatcher {
    constructor() {
        super();
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.onRotationChange = () => {
            this.quaternion.setFromEuler(this.rotation, false);
        };
        this.onQuaternionChange = () => {
            this.rotation.setFromQuaternion(this.quaternion, undefined, false);
        };
        this.onBeforeRender = () => { };
        this.onAfterRender = () => { };
        this.id = object3DId++;
        this.uuid = _Math.generateUUID();
        this.name = '';
        this.type = 'Object3D';
        this.parent = null;
        this.children = [];
        this.up = Object3D.DefaultUp.clone();
        this.position = new Vector3();
        this.rotation = new Euler();
        this.quaternion = new Quaternion();
        this.scale = new Vector3(1, 1, 1);
        this.rotation.onChange(this.onRotationChange);
        this.quaternion.onChange(this.onQuaternionChange);
        this.modelViewMatrix = new Matrix4();
        this.normalMatrix = new Matrix3();
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
        this.matrixWorldNeedsUpdate = false;
        this.layers = new Layers();
        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.userData = {};
    }
    applyMatrix(matrix) {
        this.matrix.multiplyMatrices(matrix, this.matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(q) {
        this.quaternion.premultiply(q);
        return this;
    }
    setRotationFromAxisAngle(axis, angle) {
        // assumes axis is normalized
        this.quaternion.setFromAxisAngle(axis, angle);
    }
    setRotationFromEuler(euler) {
        this.quaternion.setFromEuler(euler, true);
    }
    setRotationFromMatrix(m) {
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        this.quaternion.setFromRotationMatrix(m);
    }
    setRotationFromQuaternion(q) {
        // assumes q is normalized
        this.quaternion.copy(q);
    }
    // rotate object on axis in object space
    // axis is assumed to be normalized
    rotateOnAxis(axis, angle) {
        let q1 = new Quaternion();
        q1.setFromAxisAngle(axis, angle);
        this.quaternion.multiply(q1);
        return this;
    }
    // rotate object on axis in world space
    // axis is assumed to be normalized
    // method assumes no rotated parent
    rotateOnWorldAxis(axis, angle) {
        let q1 = new Quaternion();
        q1.setFromAxisAngle(axis, angle);
        this.quaternion.premultiply(q1);
        return this;
    }
    rotateX(angle) {
        let v1 = new Vector3(1, 0, 0);
        return this.rotateOnAxis(v1, angle);
    }
    rotateY(angle) {
        let v1 = new Vector3(0, 1, 0);
        return this.rotateOnAxis(v1, angle);
    }
    rotateZ(angle) {
        let v1 = new Vector3(0, 0, 1);
        return this.rotateOnAxis(v1, angle);
    }
    // translate object by distance along axis in object space
    // axis is assumed to be normalized
    translateOnAxis(axis, distance) {
        let v1 = new Vector3();
        v1.copy(axis).applyQuaternion(this.quaternion);
        this.position.add(v1.multiplyScalar(distance));
        return this;
    }
    translateX(distance) {
        let v1 = new Vector3(1, 0, 0);
        return this.translateOnAxis(v1, distance);
    }
    translateY(distance) {
        let v1 = new Vector3(0, 1, 0);
        return this.translateOnAxis(v1, distance);
    }
    translateZ(distance) {
        let v1 = new Vector3(0, 0, 1);
        return this.translateOnAxis(v1, distance);
    }
    localToWorld(vector) {
        return vector.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(vector) {
        let m1 = new Matrix4();
        return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
    }
    // This method does not support objects with rotated and/or translated parent(s)
    lookAt(x, y = 0, z = 0) {
        let m1 = new Matrix4();
        let vector = new Vector3();
        if (x instanceof Vector3)
            vector.copy(x);
        else
            vector.set(x, y, z);
        if (this instanceof Camera)
            m1.lookAt(this.position, vector, this.up);
        else
            m1.lookAt(vector, this.position, this.up);
        this.quaternion.setFromRotationMatrix(m1);
    }
    add(object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++)
                this.add(arguments[i]);
            return this;
        }
        if (!object)
            return this;
        if (object === this) {
            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;
        }
        if (object.parent !== null)
            object.parent.remove(object);
        object.parent = this;
        object.dispatchEvent({ type: 'added' });
        this.children.push(object);
        return this;
    }
    remove(object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++)
                this.remove(arguments[i]);
            return this;
        }
        let index = this.children.indexOf(object);
        if (index !== -1) {
            object.parent = null;
            object.dispatchEvent({ type: 'removed' });
            this.children.splice(index, 1);
        }
        return this;
    }
    getObjectById(id) {
        return this.getObjectByProperty('id', id);
    }
    getObjectByName(name) {
        return this.getObjectByProperty('name', name);
    }
    getObjectByProperty(name, value) {
        if (this[name] === value)
            return this;
        for (let i = 0, l = this.children.length; i < l; i++) {
            let child = this.children[i];
            let object = child.getObjectByProperty(name, value);
            if (object !== undefined)
                return object;
        }
        return undefined;
    }
    getWorldPosition(optionalTarget) {
        let result = optionalTarget || new Vector3();
        this.updateMatrixWorld(true);
        return result.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(optionalTarget) {
        let position = new Vector3();
        let scale = new Vector3();
        let result = optionalTarget || new Quaternion();
        this.updateMatrixWorld(true);
        this.matrixWorld.decompose(position, result, scale);
        return result;
    }
    getWorldRotation(optionalTarget) {
        let quaternion = new Quaternion();
        let result = optionalTarget || new Euler();
        this.getWorldQuaternion(quaternion);
        return result.setFromQuaternion(quaternion, this.rotation.order, false);
    }
    getWorldScale(optionalTarget) {
        let position = new Vector3();
        let quaternion = new Quaternion();
        let result = optionalTarget || new Vector3();
        this.updateMatrixWorld(true);
        this.matrixWorld.decompose(position, quaternion, result);
        return result;
    }
    getWorldDirection(optionalTarget) {
        let quaternion = new Quaternion();
        let result = optionalTarget || new Vector3();
        this.getWorldQuaternion(quaternion);
        return result.set(0, 0, 1).applyQuaternion(quaternion);
    }
    raycast(raycaster, intersects) { }
    //traverse childs
    traverse(callback) {
        callback(this);
        let children = this.children;
        for (let i = 0, l = children.length; i < l; i++)
            children[i].traverse(callback);
    }
    traverseVisible(callback) {
        if (this.visible === false)
            return;
        callback(this);
        let children = this.children;
        for (let i = 0, l = children.length; i < l; i++)
            children[i].traverseVisible(callback);
    }
    //traverse parents
    traverseAncestors(callback) {
        let parent = this.parent;
        if (parent !== null) {
            callback(parent);
            parent.traverseAncestors(callback);
        }
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(force = false) {
        if (this.matrixAutoUpdate)
            this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent === null)
                this.matrixWorld.copy(this.matrix);
            else
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        // update children
        let children = this.children;
        for (let i = 0, l = children.length; i < l; i++)
            children[i].updateMatrixWorld(force);
    }
    toJSON(meta) {
        // meta is a string when called from JSON.stringify
        let isRootObject = (meta === undefined || typeof meta === 'string');
        let output = {};
        // meta is a hash used to collect geometries, materials.
        // not providing it implies that this is the root object
        // being serialized.
        if (isRootObject) {
            // initialize meta obj
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {}
            };
            output.metadata = {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON'
            };
        }
        // standard Object3D serialization
        let object = {};
        object.uuid = this.uuid;
        object.type = this.type;
        if (this.name !== '')
            object.name = this.name;
        if (this.castShadow === true)
            object.castShadow = true;
        if (this.receiveShadow === true)
            object.receiveShadow = true;
        if (this.visible === false)
            object.visible = false;
        if (JSON.stringify(this.userData) !== '{}')
            object.userData = this.userData;
        object.matrix = this.matrix.toArray();
        if (this.geometry !== undefined) {
            object.geometry = serialize(meta.geometries, this.geometry);
            let parameters = this.geometry.parameters;
            if (parameters !== undefined && parameters.shapes !== undefined) {
                let shapes = parameters.shapes;
                if (Array.isArray(shapes)) {
                    for (let i = 0, l = shapes.length; i < l; i++) {
                        let shape = shapes[i];
                        serialize(meta.shapes, shape);
                    }
                }
                else
                    serialize(meta.shapes, shapes);
            }
        }
        if (this.material !== undefined) {
            if (Array.isArray(this.material)) {
                let uuids = [];
                for (let i = 0, l = this.material.length; i < l; i++)
                    uuids.push(serialize(meta.materials, this.material[i]));
                object.material = uuids;
            }
            else
                object.material = serialize(meta.materials, this.material);
        }
        //
        if (this.children.length > 0) {
            object.children = [];
            for (let i = 0; i < this.children.length; i++)
                object.children.push(this.children[i].toJSON(meta).object);
        }
        if (isRootObject) {
            let geometries = extractFromCache(meta.geometries);
            let materials = extractFromCache(meta.materials);
            let textures = extractFromCache(meta.textures);
            let images = extractFromCache(meta.images);
            let shapes = extractFromCache(meta.shapes);
            if (geometries.length > 0)
                output.geometries = geometries;
            if (materials.length > 0)
                output.materials = materials;
            if (textures.length > 0)
                output.textures = textures;
            if (images.length > 0)
                output.images = images;
            if (shapes.length > 0)
                output.shapes = shapes;
        }
        output.object = object;
        return output;
        //
        function serialize(library, element) {
            if (library[element.uuid] === undefined)
                library[element.uuid] = element.toJSON(meta);
            return element.uuid;
        }
        // extract data from the cache hash
        // remove metadata on each item
        // and return as array
        function extractFromCache(cache) {
            let values = [];
            for (let key in cache) {
                let data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
    }
    clone(recursive = false) {
        return new Object3D().copy(this, recursive);
    }
    copy(source, recursive = true) {
        this.name = source.name;
        this.up.copy(source.up);
        this.position.copy(source.position);
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);
        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
        this.layers.mask = source.layers.mask;
        this.visible = source.visible;
        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;
        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        if (recursive === true) {
            for (let i = 0; i < source.children.length; i++) {
                let child = source.children[i];
                this.add(child.clone());
            }
        }
        return this;
    }
}
Object3D.DefaultUp = new Vector3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */
class Box3 {
    constructor(min, max) {
        this.min = (min !== undefined) ? min : new Vector3(+Infinity, +Infinity, +Infinity);
        this.max = (max !== undefined) ? max : new Vector3(-Infinity, -Infinity, -Infinity);
    }
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }
    setFromArray(array) {
        let minX = +Infinity;
        let minY = +Infinity;
        let minZ = +Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        for (let i = 0, l = array.length; i < l; i += 3) {
            let x = array[i];
            let y = array[i + 1];
            let z = array[i + 2];
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (z < minZ)
                minZ = z;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
            if (z > maxZ)
                maxZ = z;
        }
        this.min.set(minX, minY, minZ);
        this.max.set(maxX, maxY, maxZ);
        return this;
    }
    setFromBufferAttribute(attribute) {
        let minX = +Infinity;
        let minY = +Infinity;
        let minZ = +Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        for (let i = 0, l = attribute.count; i < l; i++) {
            let x = attribute.getX(i);
            let y = attribute.getY(i);
            let z = attribute.getZ(i);
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (z < minZ)
                minZ = z;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
            if (z > maxZ)
                maxZ = z;
        }
        this.min.set(minX, minY, minZ);
        this.max.set(maxX, maxY, maxZ);
        return this;
    }
    setFromPoints(points) {
        this.makeEmpty();
        for (let i = 0, il = points.length; i < il; i++)
            this.expandByPoint(points[i]);
        return this;
    }
    setFromCenterAndSize(center, size) {
        let v1 = new Vector3();
        let halfSize = v1.copy(size).multiplyScalar(0.5);
        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);
        return this;
    }
    setFromObject(object) {
        this.makeEmpty();
        return this.expandByObject(object);
    }
    clone() {
        return new Box3().copy(this);
    }
    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }
    makeEmpty() {
        this.min.x = this.min.y = this.min.z = +Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this;
    }
    isEmpty() {
        // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
        return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
    }
    getCenter(optionalTarget) {
        let result = optionalTarget || new Vector3();
        return this.isEmpty() ? result.set(0, 0, 0) : result.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(optionalTarget) {
        let result = optionalTarget || new Vector3();
        return this.isEmpty() ? result.set(0, 0, 0) : result.subVectors(this.max, this.min);
    }
    expandByPoint(point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    }
    expandByVector(vector) {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }
    expandByScalar(scalar) {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }
    // Computes the world-axis-aligned bounding box of an object (including its children),
    // accounting for both the object's, and children's, world transforms
    traverse(node) {
        let i, l;
        let v1 = new Vector3();
        let geometry = node.geometry;
        if (geometry !== undefined) {
            if (geometry.isGeometry) {
                let vertices = geometry.vertices;
                for (i = 0, l = vertices.length; i < l; i++) {
                    v1.copy(vertices[i]);
                    v1.applyMatrix4(node.matrixWorld);
                    this.expandByPoint(v1);
                }
            }
            else if (geometry.isBufferGeometry) {
                let attribute = geometry.attributes.position;
                if (attribute !== undefined) {
                    for (i = 0, l = attribute.count; i < l; i++) {
                        v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
                        this.expandByPoint(v1);
                    }
                }
            }
        }
    }
    expandByObject(object) {
        // todo
        // object.updateMatrixWorld( true );
        // object.traverse( traverse );
        return this;
    }
    ;
    containsPoint(point) {
        return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ||
            point.z < this.min.z || point.z > this.max.z ? false : true;
    }
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y &&
            this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    getParameter(point, optionalTarget) {
        // This can potentially have a divide by zero if the box
        // has a size dimension of 0.
        let result = optionalTarget || new Vector3();
        return result.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(box) {
        // using 6 splitting planes to rule out intersections.
        return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ||
            box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
    }
    intersectsSphere(sphere) {
        let closestPoint = new Vector3();
        // Find the point on the AABB closest to the sphere center.
        this.clampPoint(sphere.center, closestPoint);
        // If that point is inside the sphere, the AABB and sphere intersect.
        return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
    }
    intersectsPlane(plane) {
        // We compute the minimum and maximum dot product values. If those values
        // are on the same side (back or front) of the plane, then there is no intersection.
        let min, max;
        if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
        }
        else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
        }
        if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
        }
        else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
        }
        if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
        }
        else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
        }
        return (min <= plane.constant && max >= plane.constant);
    }
    clampPoint(point, optionalTarget) {
        let result = optionalTarget || new Vector3();
        return result.copy(point).clamp(this.min, this.max);
    }
    distanceToPoint(point) {
        let v1 = new Vector3();
        let clampedPoint = v1.copy(point).clamp(this.min, this.max);
        return clampedPoint.sub(point).length();
    }
    getBoundingSphere(optionalTarget) {
        let v1 = new Vector3();
        let result = optionalTarget || new Sphere();
        this.getCenter(result.center);
        result.radius = this.getSize(v1).length() * 0.5;
        return result;
    }
    intersect(box) {
        this.min.max(box.min);
        this.max.min(box.max);
        // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
        if (this.isEmpty())
            this.makeEmpty();
        return this;
    }
    union(box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }
    applyMatrix4(matrix) {
        let points = [
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3()
        ];
        // transform of empty box is an empty box.
        if (this.isEmpty())
            return this;
        // NOTE: I am using a binary pattern to specify all 2^3 combinations below
        points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
        points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
        points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
        points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
        points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
        points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
        points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
        points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111
        this.setFromPoints(points);
        return this;
    }
    ;
    translate(offset) {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
}

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */
class Sphere {
    constructor(center, radius = 0) {
        this.center = (center !== undefined) ? center : new Vector3();
        this.radius = radius;
    }
    set(center, radius) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }
    setFromPoints(points, optionalCenter) {
        var box = new Box3();
        var center = this.center;
        if (optionalCenter !== undefined)
            center.copy(optionalCenter);
        else
            box.setFromPoints(points).getCenter(center);
        var maxRadiusSq = 0;
        for (var i = 0, il = points.length; i < il; i++)
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }
    clone() {
        return new Sphere().copy(this);
    }
    copy(sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }
    empty() {
        return (this.radius <= 0);
    }
    containsPoint(point) {
        return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
    }
    distanceToPoint(point) {
        return (point.distanceTo(this.center) - this.radius);
    }
    intersectsSphere(sphere) {
        var radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
    }
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(point, optionalTarget) {
        var deltaLengthSq = this.center.distanceToSquared(point);
        var result = optionalTarget || new Vector3();
        result.copy(point);
        if (deltaLengthSq > (this.radius * this.radius)) {
            result.sub(this.center).normalize();
            result.multiplyScalar(this.radius).add(this.center);
        }
        return result;
    }
    getBoundingBox(optionalTarget) {
        var box = optionalTarget || new Box3();
        box.set(this.center, this.center);
        box.expandByScalar(this.radius);
        return box;
    }
    applyMatrix4(matrix) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }
    translate(offset) {
        this.center.add(offset);
        return this;
    }
    equals(sphere) {
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
class Vector2 {
    constructor(x = 0, y = 0) {
        this.isVector2 = true;
        this.x = x;
        this.y = y;
    }
    get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setComponent(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    add(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);
        }
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }
    sub(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);
        }
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    applyMatrix3(m) {
        let x = this.x, y = this.y;
        let e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    clamp(min, max) {
        // assumes min < max, componentwise
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }
    clampScalar(minVal, maxVal) {
        let min = new Vector2();
        let max = new Vector2();
        min.set(minVal, minVal);
        max.set(maxVal, maxVal);
        return this.clamp(min, max);
    }
    clampLength(min, max) {
        let length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundToZero() {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    angle() {
        // computes the angle in radians with respect to the positive x-axis
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0)
            angle += 2 * Math.PI;
        return angle;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        let dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y));
    }
    fromArray(array, offset) {
        if (offset === undefined)
            offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }
    toArray(array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }
    rotateAround(center, angle) {
        let c = Math.cos(angle), s = Math.sin(angle);
        let x = this.x - center.x;
        let y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://clara.io
 */
let geometryId = 0; // Geometry uses even numbers as Id
class Geometry extends EventDispatcher {
    constructor() {
        super();
        this.id = geometryId += 2;
        this.uuid = _Math.generateUUID();
        this.name = '';
        this.type = 'Geometry';
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // update flags
        this.elementsNeedUpdate = false;
        this.verticesNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.lineDistancesNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }
    applyMatrix(matrix) {
        let normalMatrix = new Matrix3().getNormalMatrix(matrix);
        for (let i = 0, il = this.vertices.length; i < il; i++) {
            let vertex = this.vertices[i];
            vertex.applyMatrix4(matrix);
        }
        for (let i = 0, il = this.faces.length; i < il; i++) {
            let face = this.faces[i];
            face.normal.applyMatrix3(normalMatrix).normalize();
            for (let j = 0, jl = face.vertexNormals.length; j < jl; j++)
                face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
        }
        if (this.boundingBox !== null)
            this.computeBoundingBox();
        if (this.boundingSphere !== null)
            this.computeBoundingSphere();
        this.verticesNeedUpdate = true;
        this.normalsNeedUpdate = true;
        return this;
    }
    // rotate geometry around world x-axis
    rotateX(angle) {
        let m1 = new Matrix4();
        m1.makeRotationX(angle);
        this.applyMatrix(m1);
        return this;
    }
    // rotate geometry around world y-axis
    rotateY(angle) {
        let m1 = new Matrix4();
        m1.makeRotationY(angle);
        this.applyMatrix(m1);
        return this;
    }
    // rotate geometry around world z-axis
    rotateZ(angle) {
        let m1 = new Matrix4();
        m1.makeRotationZ(angle);
        this.applyMatrix(m1);
        return this;
    }
    // translate geometry
    translate(x, y, z) {
        let m1 = new Matrix4();
        m1.makeTranslation(x, y, z);
        this.applyMatrix(m1);
        return this;
    }
    // scale geometry
    scale(x, y, z) {
        let m1 = new Matrix4();
        m1.makeScale(x, y, z);
        this.applyMatrix(m1);
        return this;
    }
    lookAt(vector) {
        let obj = new Object3D();
        obj.lookAt(vector);
        obj.updateMatrix();
        this.applyMatrix(obj.matrix);
    }
    fromBufferGeometry(geometry) {
        let scope = this;
        let indices = (geometry.index !== null ? geometry.index.array : undefined);
        let attributes = geometry.attributes;
        let positions = attributes.position.array;
        let normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
        let colors = attributes.color !== undefined ? attributes.color.array : undefined;
        let uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
        let uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;
        if (uvs2 !== undefined)
            this.faceVertexUvs[1] = [];
        let tempNormals = [];
        let tempUVs = [];
        let tempUVs2 = [];
        for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
            this.vertices.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
            if (normals !== undefined)
                tempNormals.push(new Vector3(normals[i], normals[i + 1], normals[i + 2]));
            if (colors !== undefined)
                this.colors.push(new Color(colors[i], colors[i + 1], colors[i + 2]));
            if (uvs !== undefined)
                tempUVs.push(new Vector2(uvs[j], uvs[j + 1]));
            if (uvs2 !== undefined)
                tempUVs2.push(new Vector2(uvs2[j], uvs2[j + 1]));
        }
        function addFace(a, b, c, materialIndex) {
            let vertexNormals = normals !== undefined ? [tempNormals[a].clone(), tempNormals[b].clone(), tempNormals[c].clone()] : [];
            let vertexColors = colors !== undefined ? [scope.colors[a].clone(), scope.colors[b].clone(), scope.colors[c].clone()] : [];
            let face = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);
            scope.faces.push(face);
            if (uvs !== undefined)
                scope.faceVertexUvs[0].push([tempUVs[a].clone(), tempUVs[b].clone(), tempUVs[c].clone()]);
            if (uvs2 !== undefined)
                scope.faceVertexUvs[1].push([tempUVs2[a].clone(), tempUVs2[b].clone(), tempUVs2[c].clone()]);
        }
        let groups = geometry.groups;
        if (groups.length > 0) {
            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                let start = group.start;
                let count = group.count;
                for (let j = start, jl = start + count; j < jl; j += 3) {
                    if (indices !== undefined)
                        addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);
                    else
                        addFace(j, j + 1, j + 2, group.materialIndex);
                }
            }
        }
        else {
            if (indices !== undefined) {
                for (let i = 0; i < indices.length; i += 3)
                    addFace(indices[i], indices[i + 1], indices[i + 2]);
            }
            else {
                for (let i = 0; i < positions.length / 3; i += 3)
                    addFace(i, i + 1, i + 2);
            }
        }
        this.computeFaceNormals();
        if (geometry.boundingBox !== null)
            this.boundingBox = geometry.boundingBox.clone();
        if (geometry.boundingSphere !== null)
            this.boundingSphere = geometry.boundingSphere.clone();
        return this;
    }
    center() {
        this.computeBoundingBox();
        let offset = this.boundingBox.getCenter().negate();
        this.translate(offset.x, offset.y, offset.z);
        return offset;
    }
    normalize() {
        this.computeBoundingSphere();
        let center = this.boundingSphere.center;
        let radius = this.boundingSphere.radius;
        let s = radius === 0 ? 1 : 1.0 / radius;
        let matrix = new Matrix4();
        matrix.set(s, 0, 0, -s * center.x, 0, s, 0, -s * center.y, 0, 0, s, -s * center.z, 0, 0, 0, 1);
        this.applyMatrix(matrix);
        return this;
    }
    computeFaceNormals() {
        let cb = new Vector3(), ab = new Vector3();
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            let face = this.faces[f];
            let vA = this.vertices[face.a];
            let vB = this.vertices[face.b];
            let vC = this.vertices[face.c];
            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab);
            cb.normalize();
            face.normal.copy(cb);
        }
    }
    computeVertexNormals(areaWeighted = true) {
        let v, vl, f, fl, face, vertices;
        vertices = new Array(this.vertices.length);
        for (v = 0, vl = this.vertices.length; v < vl; v++)
            vertices[v] = new Vector3();
        if (areaWeighted) {
            // vertex normals weighted by triangle areas
            // http://www.iquilezles.org/www/articles/normals/normals.htm
            let vA, vB, vC;
            let cb = new Vector3(), ab = new Vector3();
            for (f = 0, fl = this.faces.length; f < fl; f++) {
                face = this.faces[f];
                vA = this.vertices[face.a];
                vB = this.vertices[face.b];
                vC = this.vertices[face.c];
                cb.subVectors(vC, vB);
                ab.subVectors(vA, vB);
                cb.cross(ab);
                vertices[face.a].add(cb);
                vertices[face.b].add(cb);
                vertices[face.c].add(cb);
            }
        }
        else {
            this.computeFaceNormals();
            for (f = 0, fl = this.faces.length; f < fl; f++) {
                face = this.faces[f];
                vertices[face.a].add(face.normal);
                vertices[face.b].add(face.normal);
                vertices[face.c].add(face.normal);
            }
        }
        for (v = 0, vl = this.vertices.length; v < vl; v++)
            vertices[v].normalize();
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            let vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(vertices[face.a]);
                vertexNormals[1].copy(vertices[face.b]);
                vertexNormals[2].copy(vertices[face.c]);
            }
            else {
                vertexNormals[0] = vertices[face.a].clone();
                vertexNormals[1] = vertices[face.b].clone();
                vertexNormals[2] = vertices[face.c].clone();
            }
        }
        if (this.faces.length > 0)
            this.normalsNeedUpdate = true;
    }
    computeFlatVertexNormals() {
        let f, fl, face;
        this.computeFaceNormals();
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            let vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(face.normal);
                vertexNormals[1].copy(face.normal);
                vertexNormals[2].copy(face.normal);
            }
            else {
                vertexNormals[0] = face.normal.clone();
                vertexNormals[1] = face.normal.clone();
                vertexNormals[2] = face.normal.clone();
            }
        }
        if (this.faces.length > 0)
            this.normalsNeedUpdate = true;
    }
    computeMorphNormals() {
        let i, il, f, fl, face;
        // save original normals
        // - create temp variables on first access
        //   otherwise just copy (for faster repeated calls)
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            if (!face.__originalFaceNormal)
                face.__originalFaceNormal = face.normal.clone();
            else
                face.__originalFaceNormal.copy(face.normal);
            if (!face.__originalVertexNormals)
                face.__originalVertexNormals = [];
            for (i = 0, il = face.vertexNormals.length; i < il; i++) {
                if (!face.__originalVertexNormals[i])
                    face.__originalVertexNormals[i] = face.vertexNormals[i].clone();
                else
                    face.__originalVertexNormals[i].copy(face.vertexNormals[i]);
            }
        }
        // use temp geometry to compute face and vertex normals for each morph
        let tmpGeo = new Geometry();
        tmpGeo.faces = this.faces;
        for (i = 0, il = this.morphTargets.length; i < il; i++) {
            // create on first access
            if (!this.morphNormals[i]) {
                this.morphNormals[i] = {};
                this.morphNormals[i].faceNormals = [];
                this.morphNormals[i].vertexNormals = [];
                let dstNormalsFace = this.morphNormals[i].faceNormals;
                let dstNormalsVertex = this.morphNormals[i].vertexNormals;
                let faceNormal, vertexNormals;
                for (f = 0, fl = this.faces.length; f < fl; f++) {
                    faceNormal = new Vector3();
                    vertexNormals = { a: new Vector3(), b: new Vector3(), c: new Vector3() };
                    dstNormalsFace.push(faceNormal);
                    dstNormalsVertex.push(vertexNormals);
                }
            }
            let morphNormals = this.morphNormals[i];
            // set vertices to morph target
            tmpGeo.vertices = this.morphTargets[i].vertices;
            // compute morph normals
            tmpGeo.computeFaceNormals();
            tmpGeo.computeVertexNormals();
            // store morph normals
            let faceNormal, vertexNormals;
            for (f = 0, fl = this.faces.length; f < fl; f++) {
                face = this.faces[f];
                faceNormal = morphNormals.faceNormals[f];
                vertexNormals = morphNormals.vertexNormals[f];
                faceNormal.copy(face.normal);
                vertexNormals.a.copy(face.vertexNormals[0]);
                vertexNormals.b.copy(face.vertexNormals[1]);
                vertexNormals.c.copy(face.vertexNormals[2]);
            }
        }
        // restore original normals
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            face.normal = face.__originalFaceNormal;
            face.vertexNormals = face.__originalVertexNormals;
        }
    }
    computeLineDistances() {
        let d = 0;
        let vertices = this.vertices;
        for (let i = 0, il = vertices.length; i < il; i++) {
            if (i > 0)
                d += vertices[i].distanceTo(vertices[i - 1]);
            this.lineDistances[i] = d;
        }
    }
    computeBoundingBox() {
        if (this.boundingBox === null)
            this.boundingBox = new Box3();
        this.boundingBox.setFromPoints(this.vertices);
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null)
            this.boundingSphere = new Sphere();
        this.boundingSphere.setFromPoints(this.vertices);
    }
    merge(geometry, matrix, materialIndexOffset = 0) {
        if (!(geometry && geometry.isGeometry)) {
            console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry);
            return;
        }
        let normalMatrix, vertexOffset = this.vertices.length, vertices1 = this.vertices, vertices2 = geometry.vertices, faces1 = this.faces, faces2 = geometry.faces, uvs1 = this.faceVertexUvs[0], uvs2 = geometry.faceVertexUvs[0], colors1 = this.colors, colors2 = geometry.colors;
        if (matrix !== undefined)
            normalMatrix = new Matrix3().getNormalMatrix(matrix);
        // vertices
        for (let i = 0, il = vertices2.length; i < il; i++) {
            let vertex = vertices2[i];
            let vertexCopy = vertex.clone();
            if (matrix !== undefined)
                vertexCopy.applyMatrix4(matrix);
            vertices1.push(vertexCopy);
        }
        // colors
        for (let i = 0, il = colors2.length; i < il; i++)
            colors1.push(colors2[i].clone());
        // faces
        for (let i = 0, il = faces2.length; i < il; i++) {
            let face = faces2[i], faceCopy, normal, color, faceVertexNormals = face.vertexNormals, faceVertexColors = face.vertexColors;
            faceCopy = new Face3(face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
            faceCopy.normal.copy(face.normal);
            if (normalMatrix !== undefined)
                faceCopy.normal.applyMatrix3(normalMatrix).normalize();
            for (let j = 0, jl = faceVertexNormals.length; j < jl; j++) {
                normal = faceVertexNormals[j].clone();
                if (normalMatrix !== undefined)
                    normal.applyMatrix3(normalMatrix).normalize();
                faceCopy.vertexNormals.push(normal);
            }
            faceCopy.color.copy(face.color);
            for (let j = 0, jl = faceVertexColors.length; j < jl; j++) {
                color = faceVertexColors[j];
                faceCopy.vertexColors.push(color.clone());
            }
            faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
            faces1.push(faceCopy);
        }
        // uvs
        for (let i = 0, il = uvs2.length; i < il; i++) {
            let uv = uvs2[i], uvCopy = [];
            if (uv === undefined)
                continue;
            for (let j = 0, jl = uv.length; j < jl; j++)
                uvCopy.push(uv[j].clone());
            uvs1.push(uvCopy);
        }
    }
    mergeMesh(mesh) {
        if (!(mesh && mesh.isMesh)) {
            console.error('THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh);
            return;
        }
        mesh.matrixAutoUpdate && mesh.updateMatrix();
        this.merge(mesh.geometry, mesh.matrix);
    }
    /*
     * Checks for duplicate vertices with hashmap.
     * Duplicated vertices are removed
     * and faces' vertices are updated.
     */
    mergeVertices() {
        let verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
        let unique = [], changes = [];
        let v, key;
        let precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
        let precision = Math.pow(10, precisionPoints);
        let i, il;
        let face;
        let indices, j, jl;
        for (i = 0, il = this.vertices.length; i < il; i++) {
            v = this.vertices[i];
            key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);
            if (verticesMap[key] === undefined) {
                verticesMap[key] = i;
                unique.push(this.vertices[i]);
                changes[i] = unique.length - 1;
            }
            else {
                //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                changes[i] = changes[verticesMap[key]];
            }
        }
        // if faces are completely degenerate after merging vertices, we
        // have to remove them from the geometry.
        let faceIndicesToRemove = [];
        for (i = 0, il = this.faces.length; i < il; i++) {
            face = this.faces[i];
            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];
            indices = [face.a, face.b, face.c];
            // if any duplicate vertices are found in a Face3
            // we have to remove the face as nothing can be saved
            for (let n = 0; n < 3; n++) {
                if (indices[n] === indices[(n + 1) % 3]) {
                    faceIndicesToRemove.push(i);
                    break;
                }
            }
        }
        for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {
            let idx = faceIndicesToRemove[i];
            this.faces.splice(idx, 1);
            for (j = 0, jl = this.faceVertexUvs.length; j < jl; j++)
                this.faceVertexUvs[j].splice(idx, 1);
        }
        // Use unique set of vertices
        let diff = this.vertices.length - unique.length;
        this.vertices = unique;
        return diff;
    }
    setFromPoints(points) {
        this.vertices = [];
        for (let i = 0, l = points.length; i < l; i++) {
            let point = points[i];
            this.vertices.push(new Vector3(point.x, point.y, point.z || 0));
        }
        return this;
    }
    sortFacesByMaterialIndex() {
        let faces = this.faces;
        let length = faces.length;
        // tag faces
        for (let i = 0; i < length; i++)
            faces[i]._id = i;
        // sort faces
        function materialIndexSort(a, b) {
            return a.materialIndex - b.materialIndex;
        }
        faces.sort(materialIndexSort);
        // sort uvs
        let uvs1 = this.faceVertexUvs[0];
        let uvs2 = this.faceVertexUvs[1];
        let newUvs1, newUvs2;
        if (uvs1 && uvs1.length === length)
            newUvs1 = [];
        if (uvs2 && uvs2.length === length)
            newUvs2 = [];
        for (let i = 0; i < length; i++) {
            let id = faces[i]._id;
            if (newUvs1)
                newUvs1.push(uvs1[id]);
            if (newUvs2)
                newUvs2.push(uvs2[id]);
        }
        if (newUvs1)
            this.faceVertexUvs[0] = newUvs1;
        if (newUvs2)
            this.faceVertexUvs[1] = newUvs2;
    }
    toJSON() {
        let data = {
            metadata: {
                version: 4.5,
                type: 'Geometry',
                generator: 'Geometry.toJSON'
            },
            uuid: '',
            type: '',
            name: ''
        };
        // sta ndard Geometry serialization
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '')
            data.name = this.name;
        if (this.parameters !== undefined) {
            let parameters = this.parameters;
            for (let key in parameters)
                if (parameters[key] !== undefined)
                    data[key] = parameters[key];
            return data;
        }
        let vertices = [];
        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            vertices.push(vertex.x, vertex.y, vertex.z);
        }
        let faces = [];
        let normals = [];
        let normalsHash = {};
        let colors = [];
        let colorsHash = {};
        let uvs = [];
        let uvsHash = {};
        for (let i = 0; i < this.faces.length; i++) {
            let face = this.faces[i];
            let hasMaterial = true;
            let hasFaceUv = false; // deprecated
            let hasFaceVertexUv = this.faceVertexUvs[0][i] !== undefined;
            let hasFaceNormal = face.normal.length() > 0;
            let hasFaceVertexNormal = face.vertexNormals.length > 0;
            let hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
            let hasFaceVertexColor = face.vertexColors.length > 0;
            let faceType = 0;
            faceType = setBit(faceType, 0, 0); // isQuad
            faceType = setBit(faceType, 1, hasMaterial);
            faceType = setBit(faceType, 2, hasFaceUv);
            faceType = setBit(faceType, 3, hasFaceVertexUv);
            faceType = setBit(faceType, 4, hasFaceNormal);
            faceType = setBit(faceType, 5, hasFaceVertexNormal);
            faceType = setBit(faceType, 6, hasFaceColor);
            faceType = setBit(faceType, 7, hasFaceVertexColor);
            faces.push(faceType);
            faces.push(face.a, face.b, face.c);
            faces.push(face.materialIndex);
            if (hasFaceVertexUv) {
                let faceVertexUvs = this.faceVertexUvs[0][i];
                faces.push(getUvIndex(faceVertexUvs[0]), getUvIndex(faceVertexUvs[1]), getUvIndex(faceVertexUvs[2]));
            }
            if (hasFaceNormal)
                faces.push(getNormalIndex(face.normal));
            if (hasFaceVertexNormal) {
                let vertexNormals = face.vertexNormals;
                faces.push(getNormalIndex(vertexNormals[0]), getNormalIndex(vertexNormals[1]), getNormalIndex(vertexNormals[2]));
            }
            if (hasFaceColor)
                faces.push(getColorIndex(face.color));
            if (hasFaceVertexColor) {
                let vertexColors = face.vertexColors;
                faces.push(getColorIndex(vertexColors[0]), getColorIndex(vertexColors[1]), getColorIndex(vertexColors[2]));
            }
        }
        function setBit(value, position, enabled) {
            return enabled ? value | (1 << position) : value & (~(1 << position));
        }
        function getNormalIndex(normal) {
            let hash = normal.x.toString() + normal.y.toString() + normal.z.toString();
            if (normalsHash[hash] !== undefined)
                return normalsHash[hash];
            normalsHash[hash] = normals.length / 3;
            normals.push(normal.x, normal.y, normal.z);
            return normalsHash[hash];
        }
        function getColorIndex(color) {
            let hash = color.r.toString() + color.g.toString() + color.b.toString();
            if (colorsHash[hash] !== undefined)
                return colorsHash[hash];
            colorsHash[hash] = colors.length;
            colors.push(color.getHex());
            return colorsHash[hash];
        }
        function getUvIndex(uv) {
            let hash = uv.x.toString() + uv.y.toString();
            if (uvsHash[hash] !== undefined)
                return uvsHash[hash];
            uvsHash[hash] = uvs.length / 2;
            uvs.push(uv.x, uv.y);
            return uvsHash[hash];
        }
        data.data = {};
        data.data.vertices = vertices;
        data.data.normals = normals;
        if (colors.length > 0)
            data.data.colors = colors;
        if (uvs.length > 0)
            data.data.uvs = [uvs]; // temporal backward compatibility
        data.data.faces = faces;
        return data;
    }
    clone() {
        /*
         // Handle primitives
        
         let parameters = this.parameters;
        
         if ( parameters !== undefined )
         {
             let values = [];
             for ( let key in parameters )
                values.push( parameters[ key ] );
            
             let geometry = Object.create( this.constructor.prototype );
             this.constructor.apply( geometry, values );
             return geometry;
         }
         return new this.constructor().copy( this );
         */
        return new Geometry().copy(this);
    }
    copy(source) {
        let i, il, j, jl, k, kl;
        // reset
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // name
        this.name = source.name;
        // vertices
        let vertices = source.vertices;
        for (i = 0, il = vertices.length; i < il; i++)
            this.vertices.push(vertices[i].clone());
        // colors
        let colors = source.colors;
        for (i = 0, il = colors.length; i < il; i++)
            this.colors.push(colors[i].clone());
        // faces
        let faces = source.faces;
        for (i = 0, il = faces.length; i < il; i++)
            this.faces.push(faces[i].clone());
        // face vertex uvs
        for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {
            let faceVertexUvs = source.faceVertexUvs[i];
            if (this.faceVertexUvs[i] === undefined)
                this.faceVertexUvs[i] = [];
            for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {
                let uvs = faceVertexUvs[j], uvsCopy = [];
                for (k = 0, kl = uvs.length; k < kl; k++) {
                    let uv = uvs[k];
                    uvsCopy.push(uv.clone());
                }
                this.faceVertexUvs[i].push(uvsCopy);
            }
        }
        // morph targets
        let morphTargets = source.morphTargets;
        for (i = 0, il = morphTargets.length; i < il; i++) {
            let morphTarget = {};
            morphTarget.name = morphTargets[i].name;
            // vertices
            if (morphTargets[i].vertices !== undefined) {
                morphTarget.vertices = [];
                for (j = 0, jl = morphTargets[i].vertices.length; j < jl; j++)
                    morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
            }
            // normals
            if (morphTargets[i].normals !== undefined) {
                morphTarget.normals = [];
                for (j = 0, jl = morphTargets[i].normals.length; j < jl; j++)
                    morphTarget.normals.push(morphTargets[i].normals[j].clone());
            }
            this.morphTargets.push(morphTarget);
        }
        // morph normals
        let morphNormals = source.morphNormals;
        for (i = 0, il = morphNormals.length; i < il; i++) {
            let morphNormal = {};
            // vertex normals
            if (morphNormals[i].vertexNormals !== undefined) {
                morphNormal.vertexNormals = [];
                for (j = 0, jl = morphNormals[i].vertexNormals.length; j < jl; j++) {
                    let srcVertexNormal = morphNormals[i].vertexNormals[j];
                    let destVertexNormal = {};
                    destVertexNormal.a = srcVertexNormal.a.clone();
                    destVertexNormal.b = srcVertexNormal.b.clone();
                    destVertexNormal.c = srcVertexNormal.c.clone();
                    morphNormal.vertexNormals.push(destVertexNormal);
                }
            }
            // face normals
            if (morphNormals[i].faceNormals !== undefined) {
                morphNormal.faceNormals = [];
                for (j = 0, jl = morphNormals[i].faceNormals.length; j < jl; j++)
                    morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
            }
            this.morphNormals.push(morphNormal);
        }
        // skin weights
        let skinWeights = source.skinWeights;
        for (i = 0, il = skinWeights.length; i < il; i++)
            this.skinWeights.push(skinWeights[i].clone());
        // skin indices
        let skinIndices = source.skinIndices;
        for (i = 0, il = skinIndices.length; i < il; i++)
            this.skinIndices.push(skinIndices[i].clone());
        // line distances
        let lineDistances = source.lineDistances;
        for (i = 0, il = lineDistances.length; i < il; i++)
            this.lineDistances.push(lineDistances[i]);
        // bounding box
        let boundingBox = source.boundingBox;
        if (boundingBox !== null)
            this.boundingBox = boundingBox.clone();
        // bounding sphere
        let boundingSphere = source.boundingSphere;
        if (boundingSphere !== null)
            this.boundingSphere = boundingSphere.clone();
        // update flags
        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;
        return this;
    }
    dispose() {
        this.dispatchEvent({ type: 'dispose' });
    }
}

export { Geometry };
