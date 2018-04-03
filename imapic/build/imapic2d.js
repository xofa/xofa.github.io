var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IMAPIC2D;
(function (IMAPIC2D) {
    var MATH = (function () {
        function MATH() {
        }
        MATH.IsZero = function (d) {
            return Math.abs(d) < 1e-10;
        };
        ;
        MATH.EPSILON = Math.pow(2, -52);
        MATH.MIN = 1e-10;
        return MATH;
    }());
    IMAPIC2D.MATH = MATH;
    IMAPIC2D._DEFINES_ = {
        VERSION: 'ImaPic2.2',
        DEFAULT_TEXTURE: {
            WALL: 'texture/defaultWall.jpg',
            FLOOR: 'texture/defaultFloor.jpg',
        },
        CUR_DEBUG: 2,
        DEBUG: {
            HIGH: 3.1,
            MIDDEL: 2.1,
            LOW: 1.1
        },
        EVENTS: {
            MOVE: 0,
            DRAW: 1,
            DELETE: 2,
            CLEAR: 3,
            ADD_DOOR: 4,
            ADD_DOOR1: 4.1,
            ADD_DOOR2: 4.2,
            ADD_WINDOW: 5.1,
            ADD_WINDOW1: 5.2,
            ADD_WINDOW2: 5.3
        },
        COLOR: {
            DELETE: "#ff0000"
        },
        ROOM: {
            COLOR: "#f2f2f2"
        },
        TARGET: {
            WIDTH: 1,
            RADIUS: 6,
            COLOR: "#333333"
        },
        CORNER: {
            RADIUS: 0,
            RADIUS_HOVER: 6,
            COLOR: "#ff0000",
            COLOR_HOVER: "#008cba"
        },
        WALL: {
            COLOR: "#888888",
            COLOR_FILL: "#dddddd",
            COLOR_HOVER: "#008cba",
            COLOR_SELECT: "#00baba",
            HEIGHT: 280,
            THICKNESS: 24.0
        },
        EDGE: {
            WIDTH: 1,
            COLOR: "#888888",
            COLOR_HOVER: "#008cba"
        },
        GRID: {
            SPACING: 80,
            LINE_WIDTH: 1,
            COLOR: "#f1f1f1"
        },
        IN_WALL: {
            COLOR: "#888888",
            COLOR_HOVER: "#008cba",
            ITEMS: {
                0: {
                    name: '单开门',
                    WIDTH: 100.4,
                    _HEIGHT: 210.2,
                    _BOTTOM: 0,
                    UUID: '683E476B-139C-4ECC-8184-B0C5ECDC78D6'
                },
                1: {
                    name: '双开门',
                    WIDTH: 177.2,
                    _HEIGHT: 206.8,
                    _BOTTOM: 0,
                    UUID: '361A38E7-1859-4E0C-93C0-832BA4E76ED7'
                },
                2: {
                    name: '推移门',
                    WIDTH: 150.4,
                    _HEIGHT: 205,
                    _BOTTOM: 0,
                    UUID: '84CD0E23-6070-4090-8ED5-CFFF6646C1C9'
                },
                10: {
                    name: '普通窗',
                    WIDTH: 180,
                    _HEIGHT: 195,
                    _BOTTOM: 50,
                    UUID: '34B3723B-C00B-408E-AB8F-B2253F909F45'
                },
                11: {
                    name: '落地窗',
                    WIDTH: 229.2,
                    _HEIGHT: 207.3,
                    _BOTTOM: 0,
                    UUID: '4049ACBB-EA25-404A-8CD7-B49E3EF542AB'
                },
                12: {
                    name: '飘窗',
                    WIDTH: 181.8,
                    _HEIGHT: 214,
                    _BOTTOM: 0,
                    UUID: '7208EE0B-F318-4D96-A8E4-69502D9EE6E3'
                }
            }
        },
        TOLERANCE: {
            CORNER: 30,
            MOUSE_SNAP: 25,
            INWALL_ATTACH: 10,
            DISTANCE_HOVER: 20.0
        },
        HELP_LINE: {
            LENGTH: 70,
            WIDTH: 0.5,
            COLOR: "#bbbbbb"
        },
        ALIGN_LINE: {
            WIDTH: 1.5,
            COLOR: "#00cccc"
        },
        CAMERA: {
            VISIBLE: false,
            WIDTH: 30,
            HEIGHT: 30,
            SRC: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABFCAYAAAD6pOBtAAADuElEQVR4nO2csU/rVhhHT5Dlpzxi9AYkWOwFSocKOtGdTindqiRIlRhrsgB7M4UBVZXoUvgDGBne0iWoEksltnTCZSFVMlQuEkiv6ElIoTRfB+rID5nESRxfp/KR7nRv7vfzUeJ7EzsGWAdcQMbYXOALEsqfjPfg/RISR4ancIjI+IpkMv56iWJKdQDVpAJUB1BNKqBXZ6VSQdM0MplM36ZpGpVKJa7ckSKABDE9PT3QUpfL5QLn8Y1JHD3fAbu7u+i6HmoiXdfZ2dmJJFScpPsA1QFUkwpQHUA1cQt4vnLcAW+Bj2PO0SXuk+BL/AV8BlxFWHYK+CfMoNgQkQ+a67rk83mAN8B3EZV5BXwD/BY6Fy9shKKiVw3Xdf0fh1F4A3xLwI87vTIpF/A8zBBYwA/Ae2+elZUVOT4+/t8L+BQ4Bv72Xr+2tianp6fS6XT61p1kAZ8Dp0AHEE3TpFQqSb1eH6jupAnQgBLwqzc2m83K9va2NBqNoepOioDXwDbwuzdmdnZWqtWq3NzcjFQ3qQJebIuLi3J4eCj39/eR1J0YAaurq3JyciKPj4+R1vX6Yt0JvlQjqL/fa0at6/WlX4ZUB1BNKkB1ANWkAlQHUE0qQHUA1aQCVAdQTSpAdQDVpAJUB1BNKkB1ANWkAlQHUE3iBXQ6nbHOnygB/rvOPBYWFtjf3+f6+npsdRP9q7DXdF2XYrEoZ2dn3Utfo9T1zZ0oAc+ZAr4EfgIevXFLS0tycHAgt7e3Q9edFAF+LGAP3+XvbDYrm5ubcn5+PnDdSRTgoQFfAT/z3wVSQJaXl+Xo6Eju7u5C1R1YQLPZFNu2xTRN0XVdTNMU27al2WzGLcDPIvA9cOPNkcvlxLZtqdfr0Qmo1WpiGEbgyWlmZkZqtdrQAiK6Q+QV8DXwS1DGkQS0Wq3uwRcKBXEcR9rttlxcXEihUBBADMOQVqs1sADXdSWfz3v9b0cQ4OcT4EfgXZCMgNZbwNbWlgCysbER2F8sFgWQcrncV0CP9g74KCIBHq8jEWCapgByeXkZ2O84jgBiWdYwAt6j+D5B6CNA13UB5OHhIbC/3W53NyohBCSOvlvhubk5ABqNRmD/1dXTvY3z8/MRxoqPvgLW19cBqFargf17e3sfjJtEQq8CpVKpuwo4jtM9AYZdBZQeZQ9G2gcYhhF6H6DuEHsz0E7QsizRdV0sy5JyuTzQTlDxcQaS/mVGdQDVpAJUB1BNKkB1gCTwB+G+NY3aEvkECXh6hsi4H6OR2GeI/AtOZsG/U3VnTAAAAABJRU5ErkJggg==',
            COLOR: '#6A6A6A',
            RADIUS: 110,
            ALPHA: 0.7
        }
    };
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Line = (function () {
        function Line(start, end) {
            this.start = start !== undefined ? start : new IMAPIC2D.Vec2();
            this.end = end !== undefined ? end : new IMAPIC2D.Vec2();
        }
        Line.prototype.getStart = function () {
            return this.start;
        };
        Line.prototype.getEnd = function () {
            return this.end;
        };
        Line.prototype.toJson = function () {
            return {
                start: this.start.toJson(),
                end: this.end.toJson()
            };
        };
        Line.prototype.isDuplicatePoint = function () {
            this.start.equals(this.end);
        };
        Line.prototype.set = function (start, end) {
            this.start = start;
            this.end = end;
            return this;
        };
        Line.prototype.slope = function () {
            var dx = this.end.x - this.start.x;
            var dy = this.end.y - this.start.y;
            if (dx == 0) {
                return dy > 0 ? Math.PI / 2.0 : 3.0 * Math.PI / 2.0;
            }
            var tTheta = Math.atan(dy / dx);
            if (dx < 0) {
                tTheta += Math.PI;
            }
            else if (dy < 0) {
                tTheta += Math.PI * 2.0;
            }
            return tTheta;
        };
        Line.prototype.fromVec2Array = function (v) {
            this.start = v[0];
            this.end = v[1];
            return this;
        };
        Line.prototype.fromNumber = function (x1, y1, x2, y2) {
            this.start = new IMAPIC2D.Vec2(x1, y1);
            this.end = new IMAPIC2D.Vec2(x2, y2);
            return this;
        };
        Line.prototype.clone = function () {
            return new Line(this.start, this.end);
        };
        Line.prototype.copy = function (v) {
            this.start = v.start;
            this.end = v.end;
            return this;
        };
        Line.prototype.center = function () {
            return this.start.clone().add(this.end).divideScalar(2.0);
        };
        Line.prototype.length = function () {
            return this.start.distanceTo(this.end);
        };
        Line.prototype.lengthSq = function () {
            return this.start.distanceToSquared(this.end);
        };
        Line.prototype.dir = function () {
            return this.end.clone().sub(this.start);
        };
        Line.prototype.dot = function (v) {
            return this.dir().dot(v.dir());
        };
        Line.prototype.scale = function (n) {
            return this.dir().normalize().multiplyScalar(n);
        };
        Line.prototype.getSide = function (p) {
            var p1 = p.clone().sub(this.start);
            var p2 = this.end.clone().sub(this.start);
            return p1.cross(p2);
        };
        Line.prototype.closestPointOnLine = function (point) {
            var tDot = point.clone().sub(this.start).dot(this.dir());
            var tParam = this.lengthSq() != 0 ? tDot / this.lengthSq() : -1;
            if (tParam < 0) {
                return this.start;
            }
            else if (tParam > 1) {
                return this.end;
            }
            else {
                return this.dir().multiplyScalar(tParam).add(this.start);
            }
        };
        Line.prototype.distanceToPoint = function (point) {
            return point.distanceTo(this.closestPointOnLine(point));
        };
        Line.prototype.offsetOnLine = function (v, n) {
            var offsetVec = v.clone().scale(n);
            this.start.add(offsetVec);
            this.end.add(offsetVec);
            return this;
        };
        Line.prototype.LineSegementsIntersect = function (v, considerCollinearOverlapAsIntersect) {
            if (considerCollinearOverlapAsIntersect === void 0) { considerCollinearOverlapAsIntersect = false; }
            var r = this.dir();
            var s = v.dir();
            var rxs = r.clone().cross(s);
            var qp = v.start.clone().sub(this.start);
            var qpxr = qp.clone().cross(r);
            if (IMAPIC2D.MATH.IsZero(rxs)) {
                if (IMAPIC2D.MATH.IsZero(qpxr) && considerCollinearOverlapAsIntersect) {
                    var a = qp.clone().dot(r);
                    var b = qp.clone().negate().dot(s);
                    if ((0 <= a && a <= r.clone().dot(r)) || (0 <= b && b <= s.clone().dot(s))) {
                        return true;
                    }
                }
                return false;
            }
            var t = qp.clone().cross(s) / rxs;
            var u = qp.clone().cross(r) / rxs;
            return r.clone().multiplyScalar(t).add(this.start);
        };
        return Line;
    }());
    IMAPIC2D.Line = Line;
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Vec2 = (function () {
        function Vec2(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        Vec2.prototype.fromJson = function (json) {
            this.x = json.x;
            this.y = json.y;
            return this;
        };
        Vec2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vec2.prototype.setScalar = function (scalar) {
            this.x = scalar;
            this.y = scalar;
            return this;
        };
        Vec2.prototype.setX = function (x) {
            this.x = x;
            return this;
        };
        Vec2.prototype.setY = function (y) {
            this.y = y;
            return this;
        };
        Vec2.prototype.setComponent = function (index, value) {
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
        };
        Vec2.prototype.getComponent = function (index) {
            switch (index) {
                case 0: return this.x;
                case 1: return this.y;
                default: throw new Error('index is out of range: ' + index);
            }
        };
        Vec2.prototype.clone = function () {
            return new Vec2(this.x, this.y);
        };
        Vec2.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        };
        Vec2.prototype.add = function (v, w) {
            if (w !== undefined) {
                return this.addVectors(v, w);
            }
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        Vec2.prototype.add2 = function (x, y) {
            this.x += x;
            this.y += y;
            return this;
        };
        Vec2.prototype.add_sub = function (v, w) {
            if (w !== false) {
                this.x += v.x;
                this.y += v.y;
            }
            else {
                this.x -= v.x;
                this.y -= v.y;
            }
            return this;
        };
        Vec2.prototype.addScalar = function (s) {
            this.x += s;
            this.y += s;
            return this;
        };
        Vec2.prototype.addVectors = function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this;
        };
        Vec2.prototype.addScaledVector = function (v, s) {
            this.x += v.x * s;
            this.y += v.y * s;
            return this;
        };
        Vec2.prototype.sub = function (v, w) {
            if (w !== undefined) {
                return this.subVectors(v, w);
            }
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        Vec2.prototype.subScalar = function (s) {
            this.x -= s;
            this.y -= s;
            return this;
        };
        Vec2.prototype.subVectors = function (a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this;
        };
        Vec2.prototype.multiply = function (v) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        };
        Vec2.prototype.multiplyScalar = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        };
        Vec2.prototype.divide = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        };
        Vec2.prototype.divideScalar = function (scalar) {
            return this.multiplyScalar(1 / scalar);
        };
        Vec2.prototype.applyMatrix3 = function (m) {
            var x = this.x, y = this.y;
            var e = m.elements;
            this.x = e[0] * x + e[3] * y + e[6];
            this.y = e[1] * x + e[4] * y + e[7];
            return this;
        };
        Vec2.prototype.min = function (v) {
            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            return this;
        };
        Vec2.prototype.max = function (v) {
            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            return this;
        };
        Vec2.prototype.clamp = function (min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            return this;
        };
        Vec2.prototype.clampLength = function (min, max) {
            var length = this.length();
            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
        };
        Vec2.prototype.floor = function () {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
        };
        Vec2.prototype.ceil = function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        };
        Vec2.prototype.round = function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
        };
        Vec2.prototype.roundToZero = function () {
            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            return this;
        };
        Vec2.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vec2.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        Vec2.prototype.cross = function (v) {
            return this.x * v.y - v.x * this.y;
        };
        Vec2.prototype.lengthSq = function () {
            return this.x * this.x + this.y * this.y;
        };
        Vec2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vec2.prototype.manhattanLength = function () {
            return Math.abs(this.x) + Math.abs(this.y);
        };
        Vec2.prototype.normalize = function () {
            return this.divideScalar(this.length() || 1);
        };
        Vec2.prototype.angle = function () {
            var angle = Math.atan2(this.y, this.x);
            if (angle < 0)
                angle += 2 * Math.PI;
            return angle;
        };
        Vec2.prototype.angleTo = function (v) {
            var tDot = this.dot(v);
            var tDet = this.cross(v);
            return new Vec2(tDot, tDet).angle();
        };
        Vec2.prototype.distanceTo = function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        };
        Vec2.prototype.distanceToSquared = function (v) {
            var dx = this.x - v.x, dy = this.y - v.y;
            return dx * dx + dy * dy;
        };
        Vec2.prototype.manhattanDistanceTo = function (v) {
            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
        };
        Vec2.prototype.setLength = function (length) {
            return this.normalize().multiplyScalar(length);
        };
        Vec2.prototype.lerp = function (v, alpha) {
            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            return this;
        };
        Vec2.prototype.lerpVectors = function (v1, v2, alpha) {
            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        };
        Vec2.prototype.equals = function (v) {
            return this.distanceToSquared(v) < 1e-20;
        };
        Vec2.prototype.fromArray = function (array, offset) {
            if (offset === undefined)
                offset = 0;
            this.x = array[offset];
            this.y = array[offset + 1];
            return this;
        };
        Vec2.prototype.toArray = function (array, offset) {
            if (array === undefined)
                array = [];
            if (offset === undefined)
                offset = 0;
            array[offset] = this.x;
            array[offset + 1] = this.y;
            return array;
        };
        Vec2.prototype.fromBufferAttribute = function (attribute, index, offset) {
            if (offset !== undefined) {
            }
            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            return this;
        };
        Vec2.prototype.rotateAround = function (center, angle) {
            var c = Math.cos(angle), s = Math.sin(angle);
            var x = this.x - center.x;
            var y = this.y - center.y;
            this.x = x * c - y * s + center.x;
            this.y = x * s + y * c + center.y;
            return this;
        };
        Vec2.prototype.rotatedLine = function (disVec, angle) {
            var p1 = disVec.clone().add(this).rotateAround(this, angle);
            var p2 = disVec.clone().add(this).rotateAround(this, angle - Math.PI);
            return new IMAPIC2D.Line(p1, p2);
        };
        Vec2.prototype.center = function (v) {
            return this.clone().add(v).divideScalar(2.0);
        };
        Vec2.prototype.snapped = function (v, tolerance) {
            var snapped = { x: false, y: false };
            if (Math.abs(this.x - v.x) < tolerance) {
                this.x = v.x;
                snapped.x = true;
            }
            if (Math.abs(this.y - v.y) < tolerance) {
                this.y = v.y;
                snapped.y = true;
            }
            return snapped;
        };
        Vec2.prototype.toJson = function () {
            return {
                x: this.x,
                y: this.y
            };
        };
        Vec2.prototype.slope = function () {
            return new IMAPIC2D.Line(new Vec2(0, 0), this).slope();
        };
        return Vec2;
    }());
    IMAPIC2D.Vec2 = Vec2;
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Core;
    (function (Core) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.guid = function () {
                var tS4 = function () {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                };
                return tS4() + tS4() + '-' + tS4() + '-' + tS4() + '-' + tS4() + '-' + tS4() + tS4() + tS4();
            };
            Utils.Vec2ArrayToJson = function (pts) {
                return Utils.map(pts, function (pt) { return pt.toJson(); });
            };
            Utils.pointDistanceFromLine = function (point, line) {
                return Utils.closestPointOnLine(point, line).distanceTo(point);
            };
            Utils.closestPointOnLine = function (point, line) {
                if (line.isDuplicatePoint()) {
                    return line.getStart();
                }
                var tParam = line.dot(new IMAPIC2D.Line(point, line.getEnd())) / line.lengthSq();
                if (tParam < 0) {
                    return line.getStart();
                }
                else if (tParam > 1) {
                    return line.getEnd();
                }
                else {
                    return line.getStart().clone().add(line.getEnd().multiplyScalar(tParam));
                }
            };
            Utils.angle = function (x1, y1, x2, y2) {
                var tDot = x1 * x2 + y1 * y2;
                var tDet = x1 * y2 - y1 * x2;
                var tAngle = -Math.atan2(tDet, tDot);
                return tAngle;
            };
            Utils.angle2pi = function (x1, y1, x2, y2) {
                var tTheta = Utils.angle(x1, y1, x2, y2);
                if (tTheta < 0) {
                    tTheta += 2 * Math.PI;
                }
                return tTheta;
            };
            Utils.cycle = function (arr, shift) {
                var tReturn = arr.slice(0);
                for (var tI = 0; tI < shift; tI++) {
                    var tmp = tReturn.shift();
                    tReturn.push(tmp);
                }
                return tReturn;
            };
            Utils.isClockwise = function (points) {
                var tSubX = Math.min(0, Math.min.apply(null, Utils.map(points, function (p) {
                    return p.x;
                })));
                var tSubY = Math.min(0, Math.min.apply(null, Utils.map(points, function (p) {
                    return p.x;
                })));
                var tNewPoints = Utils.map(points, function (p) {
                    return {
                        x: p.x - tSubX,
                        y: p.y - tSubY
                    };
                });
                var tSum = 0;
                for (var tI = 0; tI < tNewPoints.length; tI++) {
                    var tC1 = tNewPoints[tI];
                    var tC2;
                    if (tI == tNewPoints.length - 1) {
                        tC2 = tNewPoints[0];
                    }
                    else {
                        tC2 = tNewPoints[tI + 1];
                    }
                    tSum += (tC2.x - tC1.x) * (tC2.y + tC1.y);
                }
                return (tSum >= 0);
            };
            Utils.removeValue = function (array, value) {
                for (var tI = array.length - 1; tI >= 0; tI--) {
                    if (array[tI] === value) {
                        array.splice(tI, 1);
                    }
                }
            };
            Utils.removeIf = function (array, func) {
                var tResult = [];
                array.forEach(function (element) { if (!func(element)) {
                    tResult.push(element);
                } });
                return tResult;
            };
            Utils.setIfMin = function (a, b) { if (a < b) {
                a = b;
            } };
            Utils.setIfMax = function (a, b) { if (a > b) {
                a = b;
            } };
            Utils.map = function (array, func) {
                var tResult = [];
                array.forEach(function (element) { tResult.push(func(element)); });
                return tResult;
            };
            Utils.isPointInsidePolygon = function (inPt, inPolygon) {
                var polyLen = inPolygon.length;
                var inside = false;
                for (var p = polyLen - 1, q = 0; q < polyLen; p = q++) {
                    var edgeLowPt = inPolygon[p];
                    var edgeHighPt = inPolygon[q];
                    var edgeDx = edgeHighPt.x - edgeLowPt.x;
                    var edgeDy = edgeHighPt.y - edgeLowPt.y;
                    if (Math.abs(edgeDy) > IMAPIC2D.MATH.EPSILON) {
                        if (edgeDy < 0) {
                            edgeLowPt = inPolygon[q];
                            edgeDx = -edgeDx;
                            edgeHighPt = inPolygon[p];
                            edgeDy = -edgeDy;
                        }
                        if ((inPt.y < edgeLowPt.y) || (inPt.y > edgeHighPt.y))
                            continue;
                        if (inPt.y === edgeLowPt.y) {
                            if (inPt.x === edgeLowPt.x)
                                return true;
                        }
                        else {
                            var perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);
                            if (perpEdge === 0)
                                return true;
                            if (perpEdge < 0)
                                continue;
                            inside = !inside;
                        }
                    }
                    else {
                        if (inPt.y !== edgeLowPt.y)
                            continue;
                        if (((edgeHighPt.x <= inPt.x) && (inPt.x <= edgeLowPt.x)) ||
                            ((edgeLowPt.x <= inPt.x) && (inPt.x <= edgeHighPt.x)))
                            return true;
                    }
                }
                return inside;
            };
            Utils.hasValue = function (array, value) {
                for (var tI = 0; tI < array.length; tI++) {
                    if (array[tI] === value) {
                        return true;
                    }
                }
                return false;
            };
            return Utils;
        }());
        Core.Utils = Utils;
    })(Core = IMAPIC2D.Core || (IMAPIC2D.Core = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var InWall = (function () {
            function InWall(wall, type) {
                this.wall = wall;
                this.type = type;
                this.callbacks = {
                    move: null,
                    delete: null,
                    action: null
                };
                this.start = new IMAPIC2D.Vec2();
                this.end = new IMAPIC2D.Vec2();
                this.id = IMAPIC2D.Core.Utils.guid();
                this.initSize(type);
                this.computeStart();
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
            }
            InWall.prototype.toJson = function () {
                return {
                    id: this.id,
                    wallId: this.wall.id,
                    modelId: 0,
                    offset: this.offset,
                    length: this.length,
                    bottom: this.disToBot,
                    height: this.height,
                    type: this.type
                };
            };
            InWall.prototype.getMatrix = function () {
                var item = IMAPIC2D._DEFINES_.IN_WALL.ITEMS[this.type];
                var line = this.getLine();
                var matrix0 = new THREE.Matrix4().makeTranslation(this.length / 2.0, 0, 0);
                var matrix1 = new THREE.Matrix4().makeRotationY(Math.PI * 2.0 - line.slope());
                var matrix2 = new THREE.Matrix4().makeTranslation(line.start.x, this.disToBot, line.start.y);
                var _mat = matrix2.multiply(matrix1).multiply(matrix0);
                return _mat;
            };
            InWall.prototype.to3d = function () {
                var item = IMAPIC2D._DEFINES_.IN_WALL.ITEMS[this.type];
                var _offsetStart = this.start.distanceTo(this.wall.getStartXY());
                return {
                    id: this.id,
                    wallId: this.wall.id,
                    start: this.start.toJson(),
                    end: this.end.toJson(),
                    length: this.length,
                    offsetStart_1: _offsetStart + this.wall.offset.offset_1,
                    offsetStart_2: _offsetStart + this.wall.offset.offset_2,
                    bottom: this.disToBot,
                    height: this.height,
                    uuid: item['UUID'],
                    matrix: this.getMatrix()
                };
            };
            InWall.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            InWall.prototype.getLine = function () {
                return new IMAPIC2D.Line(this.start, this.end);
            };
            InWall.prototype.initSize = function (type) {
                var item = IMAPIC2D._DEFINES_.IN_WALL.ITEMS[type];
                this.length = item ? item.WIDTH : 100;
                this.disToBot = item ? item._BOTTOM : 50;
                this.height = item ? item._HEIGHT : 100;
            };
            InWall.prototype.setLength = function (length) {
                this.length = length;
                this.computeStart();
            };
            InWall.prototype.getLength = function () {
                return this.length;
            };
            InWall.prototype.setType = function (type) {
                this.type = type;
            };
            InWall.prototype.getType = function () {
                return this.type;
            };
            InWall.prototype.remove = function () {
                this.callbacks.delete.fire(this);
            };
            InWall.prototype.computeStart = function () {
                var line = this.wall.restrictLine;
                this.start.copy(line.start);
                this.end = line.scale(this.length).add(this.start);
            };
            InWall.prototype.compute = function (centerXY) {
                var line = this.wall.getLine();
                var p = line.closestPointOnLine(centerXY);
                var MinDistance = this.length / 2.0;
                if ((p.distanceTo(this.wall.restrictLine.start) >= MinDistance) && (p.distanceTo(this.wall.restrictLine.end) >= MinDistance)) {
                    var scaleVec = line.scale(this.length / 2.0);
                    this.start.subVectors(p, scaleVec);
                    this.end.addVectors(p, scaleVec);
                    this.offset = p.distanceTo(line.start);
                }
            };
            InWall.prototype.recompute = function () {
                var line = this.wall.getLine();
                this.start.addVectors(line.scale(this.offset - this.length / 2.0), line.start);
                this.end.addVectors(line.scale(this.offset + this.length / 2.0), line.start);
            };
            InWall.prototype.distanceFromPoint = function (point) {
                return this.getLine().distanceToPoint(point);
            };
            InWall.prototype.hovered = function (point, tolerence) {
                tolerence = tolerence | 0;
                if (this.type == 0) {
                    return this.hovered_Door_dankai(point);
                }
                else if (this.type == 1) {
                    return this.hovered_Door_shuangkai(point);
                }
                else {
                    return this.distanceFromPoint(point) < tolerence;
                }
            };
            InWall.prototype.hovered_Door_dankai = function (point) {
                return this.hoveredSemiCircle(this.start, this.end, point, Math.PI / 2.0);
            };
            InWall.prototype.hoveredSemiCircle = function (start, end, point, angle) {
                var p = end.clone().rotateAround(start, angle);
                var vec1 = end.clone().sub(start);
                var vec2 = p.clone().sub(start);
                var vec0 = point.clone().sub(start);
                var inCircle = point.distanceTo(start) < vec1.length();
                var inSemi = vec0.dot(vec1) > 0 && vec0.dot(vec2) > 0;
                if (inCircle && inSemi) {
                    return true;
                }
                return false;
            };
            InWall.prototype.hovered_Door_shuangkai = function (point) {
                var center = this.end.clone().add(this.start).divideScalar(2.0);
                if (!this.hoveredSemiCircle(this.start, center, point, Math.PI / 2.0)) {
                    return this.hoveredSemiCircle(this.end, center, point, -Math.PI / 2.0);
                }
                return true;
            };
            InWall.prototype.relativeMove = function (dx, dy) {
                this.compute(new IMAPIC2D.Vec2(dx, dy));
            };
            InWall.prototype.updateAttachedWall = function (wall) {
                var _this = this;
                if (this.wall != wall) {
                    this.wall.onItems.forEach(function (item, index) {
                        if (item === _this) {
                            _this.wall.onItems.splice(index, 1);
                        }
                    });
                    this.wall = wall;
                    this.wall.onItems.push(this);
                }
            };
            return InWall;
        }());
        Items.InWall = InWall;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var Room = (function () {
            function Room(corners, id) {
                this.corners = corners;
                this.centroid = new IMAPIC2D.Vec2();
                this.area = 0;
                this.innerPoints = [];
                this.walls = [];
                this.nameStr = "未命名";
                this.id = id || IMAPIC2D.Core.Utils.guid();
                this.update();
            }
            Room.prototype.getUuid = function () {
                return IMAPIC2D.Core.Utils.map(this.corners, function (corner) {
                    return corner.id;
                });
            };
            Room.prototype.toJson = function () {
                return {
                    id: this.id,
                    name: this.nameStr,
                    cornerIndex: this.getUuid()
                };
            };
            Room.prototype.to3d = function () {
                var tmp = 0;
                this.getWalls().forEach(function (wall) {
                    if (wall.height > tmp) {
                        tmp = wall.height;
                    }
                });
                return {
                    id: this.id,
                    height: tmp,
                    center: this.centroid.toJson(),
                    ground: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.innerPoints)
                };
            };
            Room.prototype.update = function () {
                this.updateAttachedWalls();
                this.getWalls().forEach(function (wall) {
                    wall.usedByRooms++;
                });
                this.updateEdges();
                this.innerPoints = [];
                this.updateInnerPoints(this.walls[0], this.walls[0].getStart());
                this.updateCentroidAndArea(this.innerPoints);
            };
            Room.prototype.getWalls = function () {
                return this.walls;
            };
            Room.prototype.updateAttachedWalls = function () {
                var walls = [];
                var unVisitedCorners = IMAPIC2D.Core.Utils.map(this.corners, function (corner) {
                    return corner;
                });
                unVisitedCorners.forEach(function (corner) {
                    corner.adjacentWalls().forEach(function (wall) {
                        if (!IMAPIC2D.Core.Utils.hasValue(walls, wall) && IMAPIC2D.Core.Utils.hasValue(unVisitedCorners, wall.oppositeCorner(corner))) {
                            walls.push(wall);
                        }
                    });
                    IMAPIC2D.Core.Utils.removeIf(unVisitedCorners, function (item) {
                        return item == corner;
                    });
                });
                this.walls = walls;
            };
            Room.prototype.updateEdges = function () {
                var _this = this;
                this.walls.forEach(function (wall) {
                    var p = wall.edge1.start;
                    if (IMAPIC2D.Core.Utils.isPointInsidePolygon(p, _this.corners)) {
                        p = wall.edge1.start;
                    }
                    else {
                        p = wall.edge2.start;
                    }
                    wall.isCWForRoom = wall.getLine().getSide(p) > 0 ? 1 : 0;
                    var side = wall.isCWForRoom;
                    var inEdge = side ? wall.edge1 : wall.edge2;
                    var outEdge = side ? wall.edge2 : wall.edge1;
                    inEdge.type = 0;
                    outEdge.type = 1;
                });
            };
            Room.prototype.oppositeWall = function (oneWall, corner) {
                for (var i = 0; i < this.walls.length; i++) {
                    var wall = this.walls[i];
                    if (wall != oneWall && (corner == wall.getStart() || corner == wall.getEnd())) {
                        return wall;
                    }
                }
                return null;
            };
            Room.prototype.adjacentRoomWalls = function (corner) {
                var _this = this;
                var walls = [];
                corner.adjacentWalls().forEach(function (wall) {
                    if (IMAPIC2D.Core.Utils.hasValue(_this.walls, wall)) {
                        walls.push(wall);
                    }
                });
                if (walls.length != 2) {
                    console.log('此点的临接墙居然不是2个？');
                }
                return walls;
            };
            Room.prototype.updateInnerPoints = function (wall, startCorner) {
                if (this.innerPoints.length == this.walls.length)
                    return;
                var corner = wall.oppositeCorner(startCorner);
                var wall1 = this.oppositeWall(wall, corner);
                if (wall1 == null) {
                    console.error('计算房间内墙点时，发生错误！');
                    return;
                }
                var line0 = wall.isCWForRoom == 0 ? wall.edge1 : wall.edge2;
                if (wall.getStart() == startCorner) {
                    this.innerPoints.push(line0.end);
                }
                else {
                    this.innerPoints.push(line0.start);
                }
                this.updateInnerPoints(wall1, corner);
            };
            Room.prototype.updateCentroidAndArea = function (vertices) {
                var vertexCount = vertices.length;
                var centroid = new IMAPIC2D.Vec2();
                var signedArea = 0.0;
                for (var i = 0; i < vertexCount; ++i) {
                    var p0 = vertices[i];
                    var p1 = i + 1 == vertexCount ? vertices[0] : vertices[i + 1];
                    var area = p0.cross(p1);
                    signedArea += area;
                    centroid.add(p0.clone().add(p1).multiplyScalar(area));
                }
                this.centroid = centroid.divideScalar(3.0 * signedArea);
                this.area = Math.abs(signedArea * 0.5);
            };
            return Room;
        }());
        Items.Room = Room;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var HalfEdge = (function (_super) {
            __extends(HalfEdge, _super);
            function HalfEdge(wall, start, end) {
                var _this = _super.call(this, start, end) || this;
                _this.wall = wall;
                _this.start = start;
                _this.end = end;
                _this.type = 1;
                return _this;
            }
            return HalfEdge;
        }(IMAPIC2D.Line));
        Items.HalfEdge = HalfEdge;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var Wall = (function () {
            function Wall(start, end, id) {
                this.start = start;
                this.end = end;
                this.onItems = [];
                this.isCWForRoom = 1;
                this.callbacks = {
                    move: null,
                    delete: null,
                    action: null
                };
                this.outline = {
                    startPnts: [],
                    endPnts: [],
                    lines: []
                };
                this.offset = {
                    offset_1: 0,
                    offset_2: 0
                };
                this.slope = 0.0;
                this.id = id || IMAPIC2D.Core.Utils.guid();
                this.usedByRooms = 0;
                this.start.attachStart(this);
                this.end.attachEnd(this);
                this.restrictLine = this.getLine();
                this.edge1 = new Items.HalfEdge(this, undefined, undefined);
                this.edge2 = new Items.HalfEdge(this, undefined, undefined);
                this.thickness = IMAPIC2D._DEFINES_.WALL.THICKNESS;
                this.height = IMAPIC2D._DEFINES_.WALL.HEIGHT;
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
                this.recomputeOutlinePoints();
            }
            ;
            Wall.prototype.toJson = function () {
                return {
                    id: this.id,
                    thickness: this.thickness,
                    cornerIndex: this.getUuid()
                };
            };
            Wall.prototype.to3d = function () {
                this.offset.offset_1 = this.getEdgeOffsetStart(this.edge1);
                this.offset.offset_2 = this.getEdgeOffsetStart(this.edge2);
                return {
                    id: this.id,
                    start: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.outline.startPnts),
                    end: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.outline.endPnts),
                    usedByRooms: this.usedByRooms,
                    isCW: this.isCWForRoom,
                    height: this.height,
                    width: this.thickness
                };
            };
            Wall.prototype.setThickness = function (value) {
                this.thickness = value;
            };
            Wall.prototype.setHeight = function (value) {
                this.height = value;
            };
            Wall.prototype.getStart = function () {
                return this.start;
            };
            Wall.prototype.getEnd = function () {
                return this.end;
            };
            Wall.prototype.setStart = function (corner) {
                this.start.detachWall(this);
                corner.attachStart(this);
                this.start = corner;
            };
            Wall.prototype.setEnd = function (corner) {
                this.end.detachWall(this);
                corner.attachEnd(this);
                this.end = corner;
            };
            Wall.prototype.getLine = function () {
                return new IMAPIC2D.Line().fromNumber(this.start.x, this.start.y, this.end.x, this.end.y);
            };
            Wall.prototype.getUuid = function () {
                return [this.start.id, this.end.id];
            };
            Wall.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            Wall.prototype.snapToAxis = function (tolerance) {
            };
            Wall.prototype.relativeMove = function (d) {
                var needMove1 = this.start.relativeMove(d.x, d.y);
                var needMove2 = this.end.relativeMove(d.x, d.y);
                return needMove1 && needMove2;
            };
            Wall.prototype.remove = function () {
                this.start.detachWall(this);
                this.end.detachWall(this);
                this.callbacks.delete.fire(this);
            };
            Wall.prototype.distanceFromPoint = function (point) {
                return this.getLine().distanceToPoint(point);
            };
            Wall.prototype.hovered = function (point, tolerence) {
                return this.distanceFromPoint(point) < tolerence;
            };
            Wall.prototype.getStartXY = function (isStart) {
                return isStart === false ? new IMAPIC2D.Vec2(this.end.x, this.end.y) : new IMAPIC2D.Vec2(this.start.x, this.start.y);
            };
            Wall.prototype.oppositeCorner = function (corner) {
                if (this.start === corner) {
                    return this.end;
                }
                else if (this.end === corner) {
                    return this.start;
                }
                else {
                    console.log('Wall does not connect to corner');
                }
            };
            Wall.prototype.recomputeOutlinePoints = function () {
                this.start.recomputeOutlinePoints();
                this.end.recomputeOutlinePoints();
            };
            Wall.prototype.computeSlopeRadian = function () {
                var slope = this.getLine().slope();
                slope += this.end.x < this.start.x ? Math.PI : 0;
                return slope;
            };
            Wall.prototype.updateAddonPointAndLine = function () {
                var start_outline = this.start.getWallOutlineAddons(this.edge2.start, this.edge1.start);
                var end_outline = this.end.getWallOutlineAddons(this.edge1.end, this.edge2.end);
                this.outline.startPnts = start_outline.points;
                this.outline.endPnts = end_outline.points;
                this.outline.lines = [this.edge1, this.edge2];
                if (start_outline.line !== undefined) {
                    this.outline.lines.push(start_outline.line);
                }
                if (end_outline.line !== undefined) {
                    this.outline.lines.push(end_outline.line);
                }
            };
            Wall.prototype.getEdgeOffsetStart = function (edge) {
                var p = this.getLine().closestPointOnLine(edge.start);
                var offset = -p.distanceTo(this.start);
                if (p.equals(this.start)) {
                    offset = edge.closestPointOnLine(this.start).distanceTo(edge.start);
                }
                return offset;
            };
            Wall.prototype.computeEdgeOffsetStart = function () {
                return {
                    offset_1: this.getEdgeOffsetStart(this.edge1),
                    offset_2: this.getEdgeOffsetStart(this.edge2)
                };
            };
            return Wall;
        }());
        Items.Wall = Wall;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var Camera = (function (_super) {
            __extends(Camera, _super);
            function Camera(x, y) {
                var _this = _super.call(this, x, y) || this;
                _this.rotate = 45;
                _this.angles = 80;
                _this.callback = $.Callbacks();
                _this.dragCallback = $.Callbacks();
                return _this;
            }
            Camera.prototype.getPosition = function () {
                return new IMAPIC2D.Vec2(this.x, this.y);
            };
            Camera.prototype.distanceFromPoint = function (point) {
                return this.getPosition().distanceTo(point);
            };
            Camera.prototype.move = function (newX, newY) {
                this.x = newX;
                this.y = newY;
                return true;
            };
            Camera.prototype.drag = function (point) {
                var rotate = Math.atan(point.y / point.x) * 180 / Math.PI;
                if (point.x < 0) {
                    rotate = rotate + 180;
                }
                if (rotate < 0) {
                    rotate = rotate + 360;
                }
                this.rotate = rotate;
                this.dragCallback.fire(this.rotate);
            };
            return Camera;
        }(IMAPIC2D.Vec2));
        Items.Camera = Camera;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var Floorplan = (function () {
            function Floorplan() {
                this.index = 0;
                this.cameraList = [];
                this.cornerList = [];
                this.wallList = [];
                this.roomList = [];
                this.inWallList = [];
                this.callbacks = {
                    new_corner: null,
                    new_wall: null,
                    redraw: null,
                    updated_rooms: null,
                    roomLoaded: null
                };
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
            }
            Floorplan.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            Floorplan.prototype.update = function () {
                var roomCorners = this.findRooms(this.cornerList);
                var scope = this;
                this.getWalls().forEach(function (wall) {
                    wall.usedByRooms = 0;
                });
                this.roomList = [];
                IMAPIC2D.Core.Utils.map(roomCorners, function (corners) {
                    scope.newRoom(corners);
                });
            };
            Floorplan.prototype.hoverOnItem = function (pos, items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].hovered(pos, IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER)) {
                        return items[i];
                    }
                }
                return null;
            };
            Floorplan.prototype.cameraHoverOnItem = function (pos, items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].distanceFromPoint(pos) < 80) {
                        return items[i];
                    }
                }
                return null;
            };
            Floorplan.prototype.sectorHoverOnItem = function (pos, items) {
                for (var i = 0; i < items.length; i++) {
                    var slope = new IMAPIC2D.Line(items[i], pos).slope();
                    var angleA = items[i].rotate - items[i].angles / 2;
                    this.pointA = new IMAPIC2D.Vec2(Math.cos(angleA * Math.PI / 180) * IMAPIC2D._DEFINES_.CAMERA.RADIUS + items[i].x, Math.sin(angleA * Math.PI / 180) * IMAPIC2D._DEFINES_.CAMERA.RADIUS + items[i].y);
                    var slopeA = new IMAPIC2D.Line(items[i], this.pointA).slope();
                    var angleB = items[i].rotate + items[i].angles / 2;
                    this.pointB = new IMAPIC2D.Vec2(Math.cos(angleB * Math.PI / 180) * IMAPIC2D._DEFINES_.CAMERA.RADIUS + items[i].x, Math.sin(angleB * Math.PI / 180) * IMAPIC2D._DEFINES_.CAMERA.RADIUS + items[i].y);
                    var slopeB = new IMAPIC2D.Line(items[i], this.pointB).slope();
                    var rangeA = (slope - slopeA) / (1 + slopeA * slope);
                    var rangeB = (slopeB - slope) / (1 + slopeB * slope);
                    var length = new IMAPIC2D.Line(items[i], pos).length();
                    if (rangeA > 0 && rangeB > 0 && length <= IMAPIC2D._DEFINES_.CAMERA.RADIUS * 2) {
                        return items[i];
                    }
                }
                return null;
            };
            Floorplan.prototype.clearItem = function (item) {
                var tmp = item.slice(0);
                tmp.forEach(function (tmpItem) {
                    tmpItem.remove();
                });
                item = [];
            };
            Floorplan.prototype.clear = function () {
                this.clearItem(this.inWallList);
                this.clearItem(this.cornerList);
                this.clearItem(this.wallList);
                this.roomList = [];
            };
            Floorplan.prototype.newCorner = function (x, y, id) {
                var _this = this;
                var corner = new Items.Corner(x, y, this, id);
                this.cornerList.push(corner);
                corner.fireOnType('delete', function () { IMAPIC2D.Core.Utils.removeValue(_this.cornerList, corner); });
                return corner;
            };
            Floorplan.prototype.getCorners = function () {
                return this.cornerList;
            };
            Floorplan.prototype.getCornersRegion = function () {
                var min = new IMAPIC2D.Vec2(Infinity, Infinity);
                var max = new IMAPIC2D.Vec2(-Infinity, -Infinity);
                this.cornerList.forEach(function (corner) {
                    IMAPIC2D.Core.Utils.setIfMax(min.x, corner.x);
                    IMAPIC2D.Core.Utils.setIfMin(max.x, corner.x);
                    IMAPIC2D.Core.Utils.setIfMax(min.y, corner.y);
                    IMAPIC2D.Core.Utils.setIfMin(max.y, corner.y);
                });
                return {
                    min: min,
                    max: max
                };
            };
            Floorplan.prototype.getCenterOrSize = function (isCenter) {
                var region = this.getCornersRegion();
                if (region.min.x == Infinity || region.max.x == -Infinity || region.min.y == Infinity || region.max.y == -Infinity) {
                    return new IMAPIC2D.Vec2();
                }
                return isCenter ? region.min.clone().add(region.max).divideScalar(2.0) : region.max.clone().sub(region.min);
            };
            Floorplan.prototype.newWall = function (start, end, id) {
                var _this = this;
                var wall = new Items.Wall(start, end, id);
                this.wallList.push(wall);
                wall.fireOnType('delete', function () { IMAPIC2D.Core.Utils.removeValue(_this.wallList, wall); });
                return wall;
            };
            Floorplan.prototype.getWalls = function () {
                return this.wallList;
            };
            Floorplan.prototype.checkWallItemPlacement = function (wall, inWallItem) {
                var items = wall.onItems;
                items.sort(function (a, b) {
                    return a.offset - b.offset;
                });
                var isPlaceable = false;
                var start = wall.restrictLine.start.clone();
                var InWallItemLength = inWallItem.getLength();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var dis = item.start.distanceTo(start);
                    if (dis < InWallItemLength) {
                        start.copy(item.end);
                    }
                    else {
                        isPlaceable = true;
                        break;
                    }
                }
                if (!isPlaceable && start.distanceTo(wall.restrictLine.end) > InWallItemLength) {
                    isPlaceable = true;
                }
                if (isPlaceable) {
                    inWallItem.updateAttachedWall(wall);
                    inWallItem.offset = start.distanceTo(wall.getStartXY()) + InWallItemLength / 2.0;
                    inWallItem.recompute();
                }
                return isPlaceable;
            };
            Floorplan.prototype.findPlaceableWallIndex = function (index, inWallItem, curWall) {
                if (index === this.wallList.length) {
                    console.warn('已遍历所有的墙，仍然找不到空位来放置');
                    return -1;
                }
                var wall = this.wallList[index];
                if (wall == curWall || !this.checkWallItemPlacement(wall, inWallItem)) {
                    console.log('当前墙不行，需要更换一个墙来放置', index + 1);
                    return this.findPlaceableWallIndex(++index, inWallItem, curWall);
                }
                else {
                    return index;
                }
            };
            Floorplan.prototype.newInWall = function (type, wall) {
                var _this = this;
                if (!wall) {
                    wall = this.wallList[0];
                    if (!wall) {
                        alert('请【先绘制墙】，再添加墙上物体！');
                        return false;
                    }
                }
                var canPlace = false;
                var item = new Items.InWall(wall, type);
                if (!this.checkWallItemPlacement(wall, item)) {
                    var index = this.findPlaceableWallIndex(0, item, wall);
                    console.log('final wall index', index);
                    if (index > -1) {
                        wall = this.wallList[index];
                        canPlace = true;
                    }
                }
                else {
                    canPlace = true;
                }
                if (canPlace) {
                    wall.onItems.push(item);
                    this.inWallList.push(item);
                    item.fireOnType('delete', function () {
                        IMAPIC2D.Core.Utils.removeValue(_this.inWallList, item);
                        IMAPIC2D.Core.Utils.removeValue(wall.onItems, item);
                    });
                    return item;
                }
                return false;
            };
            Floorplan.prototype.getInWall = function () {
                return this.inWallList;
            };
            Floorplan.prototype.newCamera = function (x, y) {
                this.camera = new Items.Camera(x, y);
                this.cameraList.push(this.camera);
                return this.camera;
            };
            Floorplan.prototype.getCamera = function () {
                return this.cameraList;
            };
            Floorplan.prototype.newRoom = function (corners, id) {
                var room = new Items.Room(corners, id);
                this.roomList.push(room);
                return room;
            };
            Floorplan.prototype.getRooms = function () {
                return this.roomList;
            };
            Floorplan.prototype.findRooms = function (corners) {
                function _calculateTheta(previousCorner, currentCorner, nextCorner) {
                    var theta = IMAPIC2D.Core.Utils.angle2pi(previousCorner.x - currentCorner.x, previousCorner.y - currentCorner.y, nextCorner.x - currentCorner.x, nextCorner.y - currentCorner.y);
                    return theta;
                }
                function _removeDuplicateRooms(roomArray) {
                    var results = [];
                    var lookup = {};
                    var hashFunc = function (corner) {
                        return corner.id;
                    };
                    var sep = '-';
                    for (var i = 0; i < roomArray.length; i++) {
                        var add = true;
                        var room = roomArray[i];
                        for (var j = 0; j < room.length; j++) {
                            var roomShift = IMAPIC2D.Core.Utils.cycle(room, j);
                            var str = IMAPIC2D.Core.Utils.map(roomShift, hashFunc).join(sep);
                            if (lookup.hasOwnProperty(str)) {
                                add = false;
                            }
                        }
                        if (add) {
                            results.push(roomArray[i]);
                            lookup[str] = true;
                        }
                    }
                    return results;
                }
                function _findTightestCycle(firstCorner, secondCorner) {
                    var stack = [];
                    var next = {
                        corner: secondCorner,
                        previousCorners: [firstCorner]
                    };
                    var visited = {};
                    visited[firstCorner.id] = true;
                    while (next) {
                        var currentCorner = next.corner;
                        visited[currentCorner.id] = true;
                        if (next.corner === firstCorner && currentCorner !== secondCorner) {
                            return next.previousCorners;
                        }
                        var addToStack = [];
                        var adjacentCorners = next.corner.adjacentCorners();
                        for (var i = 0; i < adjacentCorners.length; i++) {
                            var nextCorner = adjacentCorners[i];
                            if (nextCorner.id in visited &&
                                !(nextCorner === firstCorner && currentCorner !== secondCorner)) {
                                continue;
                            }
                            addToStack.push(nextCorner);
                        }
                        var previousCorners = next.previousCorners.slice(0);
                        previousCorners.push(currentCorner);
                        if (addToStack.length > 1) {
                            var previousCorner = next.previousCorners[next.previousCorners.length - 1];
                            addToStack.sort(function (a, b) {
                                return (_calculateTheta(previousCorner, currentCorner, b) -
                                    _calculateTheta(previousCorner, currentCorner, a));
                            });
                        }
                        if (addToStack.length > 0) {
                            addToStack.forEach(function (corner) {
                                stack.push({
                                    corner: corner,
                                    previousCorners: previousCorners
                                });
                            });
                        }
                        next = stack.pop();
                    }
                    return [];
                }
                var loops = [];
                corners.forEach(function (firstCorner) {
                    firstCorner.adjacentCorners().forEach(function (secondCorner) {
                        loops.push(_findTightestCycle(firstCorner, secondCorner));
                    });
                });
                var uniqueLoops = _removeDuplicateRooms(loops);
                var uniqueCCWLoops = IMAPIC2D.Core.Utils.removeIf(uniqueLoops, IMAPIC2D.Core.Utils.isClockwise);
                if (uniqueCCWLoops.length > 0 && IMAPIC2D._DEFINES_.CUR_DEBUG < IMAPIC2D._DEFINES_.DEBUG.HIGH) {
                }
                return uniqueCCWLoops;
            };
            Floorplan.prototype.saveFloorplan = function () {
                var floorplan = {
                    corners: [],
                    walls: [],
                    inWalls: [],
                    rooms: []
                };
                this.getCorners().forEach(function (corner) {
                    floorplan.corners.push(corner.toJson());
                });
                this.getWalls().forEach(function (wall) {
                    floorplan.walls.push(wall.toJson());
                });
                this.getInWall().forEach(function (inwall) {
                    floorplan.inWalls.push(inwall.toJson());
                });
                this.getRooms().forEach(function (room, roomIndex) {
                    floorplan.rooms.push(room.toJson());
                });
                return floorplan;
            };
            Floorplan.prototype.loadFloorplan = function (floorplan) {
                var _this = this;
                this.clear();
                var corners = [];
                floorplan['corners'].forEach(function (cornerJSON) {
                    corners.push(_this.newCorner(cornerJSON.x, cornerJSON.y, cornerJSON.id));
                });
                var walls = [];
                floorplan['walls'].forEach(function (wallJSON) {
                    var corner1 = undefined, corner2 = undefined;
                    for (var i = 0; i < corners.length; i++) {
                        if (corners[i].id == wallJSON.cornerIndex[0]) {
                            corner1 = corners[i];
                        }
                        else if (corners[i].id == wallJSON.cornerIndex[1]) {
                            corner2 = corners[i];
                        }
                        if (corner1 !== undefined && corner2 !== undefined) {
                            break;
                        }
                    }
                    if (corner1 !== undefined && corner2 !== undefined) {
                        var wall = _this.newWall(corner1, corner2, wallJSON.id);
                        wall.setThickness(wallJSON.thickness);
                        walls.push(wall);
                    }
                    else {
                        console.warn('some wall corner error load');
                    }
                });
                floorplan['inWalls'].forEach(function (inwallJSON) {
                    var wall;
                    for (var i = 0; i < walls.length; i++) {
                        if (walls[i].id == inwallJSON['wallId']) {
                            wall = walls[i];
                            break;
                        }
                    }
                    var inWall = _this.newInWall(inwallJSON['type'], wall);
                    if (inWall !== false) {
                        inWall.offset = inwallJSON['offset'];
                        inWall.recompute();
                    }
                });
                floorplan['rooms'].forEach(function (roomJSON) {
                    var roomCorners = [];
                    roomJSON.cornerIndex.forEach(function (id) {
                        for (var i = 0; i < corners.length; i++) {
                            if (corners[i].id == id) {
                                roomCorners.push(corners[i]);
                                break;
                            }
                        }
                    });
                    var room = _this.newRoom(roomCorners, roomJSON.id);
                    room.nameStr = roomJSON.name;
                });
            };
            Floorplan.prototype.loadSerialized = function (json) {
                var data = JSON.parse(json);
                this.loadFloorplan(data.floorplan);
            };
            Floorplan.prototype.exportSerialized = function () {
                var room = {
                    floorplan: this.saveFloorplan()
                };
                return JSON.stringify(room);
            };
            Floorplan.prototype.convertTo3d = function () {
                var floorplan = {
                    walls: [],
                    inWalls: [],
                    rooms: []
                };
                this.getCorners().forEach(function (corner) {
                });
                this.getRooms().forEach(function (room) {
                    floorplan.rooms.push(room.to3d());
                });
                this.getWalls().forEach(function (wall) {
                    floorplan.walls.push(wall.to3d());
                });
                this.getInWall().forEach(function (inWall) {
                    floorplan.inWalls.push(inWall.to3d());
                });
                console.log(floorplan);
                return JSON.stringify(floorplan);
            };
            return Floorplan;
        }());
        Items.Floorplan = Floorplan;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var Corner = (function (_super) {
            __extends(Corner, _super);
            function Corner(x, y, floorplan, id) {
                var _this = _super.call(this, x, y) || this;
                _this.floorplan = floorplan;
                _this.callbacks = {
                    'move': null,
                    'delete': null,
                    'action': null
                };
                _this.wallStarts = [];
                _this.wallEnds = [];
                _this.id = id || IMAPIC2D.Core.Utils.guid();
                for (var item in _this.callbacks) {
                    _this.callbacks[item] = $.Callbacks();
                }
                return _this;
            }
            Corner.prototype.toJson = function () {
                return {
                    id: this.id,
                    x: this.x,
                    y: this.y
                };
            };
            Corner.prototype.getPosition = function () {
                return new IMAPIC2D.Vec2(this.x, this.y);
            };
            Corner.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            Corner.prototype.snapToAxis = function (tolerance) {
            };
            Corner.prototype.distanceFromPoint = function (point) {
                return this.getPosition().distanceTo(point);
            };
            Corner.prototype.hovered = function (point, tolerence) {
                return this.distanceFromPoint(point) < tolerence;
            };
            Corner.prototype.remove = function () {
                this.callbacks['delete'].fire(this);
            };
            Corner.prototype.needMove = function (newPnt) {
                var walls = this.adjacentWalls();
                newPnt = newPnt || this.getPosition();
                if (!walls || walls.length < 2) {
                    return true;
                }
                else {
                    var _walls = this.sortWalls(walls);
                    for (var i = 0, len = _walls.length; i < len; i++) {
                        var wall0 = _walls[i];
                        var wall1 = i + 1 == len ? _walls[0] : _walls[i + 1];
                        var slope0 = new IMAPIC2D.Line(newPnt, wall0.oppositeCorner(this)).slope();
                        var slope1 = new IMAPIC2D.Line(newPnt, wall1.oppositeCorner(this)).slope();
                        if (Math.abs(slope0 - slope1) < Math.PI / 18.0) {
                            return false;
                        }
                    }
                    return true;
                }
            };
            Corner.prototype.move = function (newX, newY) {
                if (!this.needMove(new IMAPIC2D.Vec2(newX, newY))) {
                    return false;
                }
                else {
                    this.x = newX;
                    this.y = newY;
                    var corners = this.adjacentCorners();
                    for (var i = 0; i < corners.length; i++) {
                        if (!corners[i].needMove()) {
                            return false;
                        }
                    }
                }
                this.recomputeOutlinePoints();
                this.adjacentCorners().forEach(function (corner) {
                    corner.recomputeOutlinePoints();
                });
                return true;
            };
            Corner.prototype.relativeMove = function (dx, dy) {
                return this.move(this.x + dx, this.y + dy);
            };
            Corner.prototype.removeDuplicateWalls = function () {
                var _this = this;
                var wallEndpoints = {};
                var wallStartpoints = {};
                this.wallStarts.forEach(function (wall) {
                    var corner = wall.getEnd();
                    if (corner == _this || corner.id in wallEndpoints) {
                        corner.remove();
                    }
                    else {
                        wallEndpoints[corner.id] = true;
                    }
                });
                this.wallEnds.forEach(function (wall) {
                    var corner = wall.getStart();
                    if (corner == _this || corner.id in wallStartpoints) {
                        corner.remove();
                    }
                    else {
                        wallEndpoints[corner.id] = true;
                    }
                });
            };
            Corner.prototype.combineWithCorner = function (corner) {
                this.x = corner.x;
                this.y = corner.y;
                for (var i = corner.wallStarts.length - 1; i >= 0; i--) {
                    corner.wallStarts[i].setStart(this);
                }
                for (var i = corner.wallEnds.length - 1; i >= 0; i--) {
                    corner.wallEnds[i].setEnd(this);
                }
                corner.removeAll();
                this.removeDuplicateWalls();
            };
            Corner.prototype.removeAll = function () {
                this.remove();
            };
            Corner.prototype.mergeWithIntersected = function (tolerance) {
                for (var i = 0, corners = this.floorplan.getCorners(); i < corners.length; i++) {
                    var corner = corners[i];
                    if (this !== corner && this.distanceFromPoint(corner.getPosition()) < tolerance) {
                        this.combineWithCorner(corner);
                        return true;
                    }
                }
                for (var i = 0, walls = this.floorplan.getWalls(); i < walls.length; i++) {
                    var wall = walls[i];
                    if (!this.isWallConnected(wall) && wall.distanceFromPoint(this.getPosition()) < tolerance) {
                        var intersection = wall.getLine().closestPointOnLine(this.getPosition());
                        this.x = intersection.x;
                        this.y = intersection.y;
                        var wall0 = this.floorplan.newWall(this, wall.getEnd());
                        wall.setEnd(this);
                        wall0.recomputeOutlinePoints();
                        wall.recomputeOutlinePoints();
                        return true;
                    }
                }
                return false;
            };
            Corner.prototype.adjacentCorners = function () {
                return IMAPIC2D.Core.Utils.map(this.wallStarts, function (wall) { return wall.getEnd(); }).concat(IMAPIC2D.Core.Utils.map(this.wallEnds, function (wall) { return wall.getStart(); }));
            };
            Corner.prototype.adjacentWalls = function () {
                return this.wallStarts.concat(this.wallEnds);
            };
            Corner.prototype.isWallConnected = function (wall) {
                if (IMAPIC2D.Core.Utils.hasValue(this.wallStarts, wall)) {
                    return 1;
                }
                if (IMAPIC2D.Core.Utils.hasValue(this.wallEnds, wall)) {
                    return 2;
                }
                return 0;
            };
            Corner.prototype.detachWall = function (wall) {
                IMAPIC2D.Core.Utils.removeValue(this.wallStarts, wall);
                IMAPIC2D.Core.Utils.removeValue(this.wallEnds, wall);
                if (this.wallStarts.length == 0 && this.wallEnds.length == 0) {
                    this.remove();
                }
            };
            Corner.prototype.attachStart = function (wall) {
                this.wallStarts.push(wall);
            };
            Corner.prototype.attachEnd = function (wall) {
                this.wallEnds.push(wall);
            };
            Corner.prototype.jsSort = function (arr) {
                return arr.sort(function (a, b) {
                    return a.slope - b.slope;
                });
            };
            Corner.prototype.sortWalls = function (walls) {
                for (var i = 0; i < walls.length; i++) {
                    var wall = walls[i];
                    wall.slope = new IMAPIC2D.Line(this, wall.oppositeCorner(this)).slope();
                }
                return this.jsSort(walls);
            };
            Corner.prototype.classifyEdgeCorner = function (wall, isFirst, pt0, pt1) {
                var side = wall.getLine().getSide(pt0);
                if (wall.getStart() == this) {
                    if (isFirst) {
                        wall.edge1.start = side < 0 ? pt0 : pt1;
                    }
                    else {
                        wall.edge2.start = side > 0 ? pt0 : pt1;
                    }
                }
                else if (wall.getEnd() == this) {
                    if (isFirst) {
                        wall.edge2.end = side > 0 ? pt0 : pt1;
                    }
                    else {
                        wall.edge1.end = side < 0 ? pt0 : pt1;
                    }
                }
                else {
                    console.warn('classifyEdgeCorner :not start or end????');
                }
            };
            Corner.prototype.pushPointIntoTwoWalls = function (wall0, wall1) {
                var angleA = wall0.slope;
                var angleB = wall1.slope;
                var theta = angleB - angleA;
                var _tmp = Math.abs(theta);
                if (Math.abs(_tmp - Math.PI) < Math.PI / 90.0) {
                    var wall = wall0;
                    var disVec = new IMAPIC2D.Line(this, wall.oppositeCorner(this)).scale(wall.thickness / 2.0);
                    var line = this.rotatedLine(disVec, -Math.PI / 2.0);
                    this.classifyEdgeCorner(wall, true, line.start, line.end);
                    wall = wall1;
                    disVec = new IMAPIC2D.Line(this, wall.oppositeCorner(this)).scale(wall.thickness / 2.0);
                    line = this.rotatedLine(disVec, Math.PI / 2.0);
                    this.classifyEdgeCorner(wall, false, line.start, line.end);
                    return true;
                }
                var p0 = wall1.thickness / 2.0;
                var p1 = wall0.thickness / 2.0;
                var p1_cot0 = (p0 + p1 * Math.cos(theta)) / Math.sin(theta);
                var sinA = Math.sin(angleA);
                var cosA = Math.cos(angleA);
                var disX = p1_cot0 * cosA - p1 * sinA;
                var disY = p1_cot0 * sinA + p1 * cosA;
                var disVec = new IMAPIC2D.Vec2(disX, disY);
                var center = this.getPosition();
                var pt0 = center.clone().sub(disVec);
                var pt1 = center.clone().add(disVec);
                this.classifyEdgeCorner(wall0, true, pt0, pt1);
                this.classifyEdgeCorner(wall1, false, pt0, pt1);
                return true;
            };
            Corner.prototype.recomputeOutlinePoints = function () {
                var _this = this;
                var walls = this.adjacentWalls();
                if (!walls || walls.length < 1)
                    return;
                if (walls.length == 1) {
                    var wall = walls[0];
                    var line = wall.getLine();
                    var disVec = line.scale(wall.thickness / 2.0);
                    var _Line = this.getPosition().rotatedLine(disVec, Math.PI / 2.0);
                    var p1 = _Line.start;
                    var p2 = _Line.end;
                    this.classifyEdgeCorner(wall, true, p1, p2);
                    this.classifyEdgeCorner(wall, false, p1, p2);
                    this.computeRestrictLine(wall);
                }
                else {
                    var _walls = this.sortWalls(walls);
                    for (var i = 0, len = _walls.length; i < len; i++) {
                        var wall0 = _walls[i];
                        var wall1 = i + 1 == len ? _walls[0] : _walls[i + 1];
                        this.pushPointIntoTwoWalls(wall0, wall1);
                    }
                    _walls.forEach(function (wall) {
                        _this.computeRestrictLine(wall);
                    });
                }
                walls.forEach(function (wall) {
                    wall.updateAddonPointAndLine();
                });
            };
            Corner.prototype.computeRestrictLine = function (wall) {
                var line = wall.getLine();
                var p0 = this.getPosition();
                if (wall.getStart() == this) {
                    var p1 = line.closestPointOnLine(wall.edge1.start);
                    var p2 = line.closestPointOnLine(wall.edge2.start);
                    wall.restrictLine.start = p1.distanceTo(p0) > p2.distanceTo(p0) ? p1 : p2;
                }
                else if (wall.getEnd() == this) {
                    var p1 = line.closestPointOnLine(wall.edge1.end);
                    var p2 = line.closestPointOnLine(wall.edge2.end);
                    wall.restrictLine.end = p1.distanceTo(p0) > p2.distanceTo(p0) ? p1 : p2;
                }
            };
            Corner.prototype.getWallOutlineAddons = function (p1, p2) {
                var outline = {
                    points: [p1, p2],
                    line: undefined
                };
                var wallCount = this.adjacentWalls().length;
                if (wallCount > 1) {
                    outline.points = [p1, this.getPosition(), p2];
                }
                else if (wallCount == 1) {
                    outline.line = new IMAPIC2D.Line(p1, p2);
                }
                return outline;
            };
            return Corner;
        }(IMAPIC2D.Vec2));
        Items.Corner = Corner;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var EventHandle;
    (function (EventHandle) {
        var Handle = (function () {
            function Handle(engine, floorplan) {
                this.engine = engine;
                this.floorplan = floorplan;
                this.mode = 0;
                this.active = {
                    corner: null,
                    wall: null,
                    inWall: null,
                    camera: null,
                    sector: null
                };
                this.selected = {
                    room: null,
                    wall: null
                };
                this.origin = new IMAPIC2D.Vec2();
                this.target = new IMAPIC2D.Vec2();
                this.alignCorners = {
                    snap1: null,
                    snap2: null
                };
                this.curMouse = new IMAPIC2D.Vec2();
                this.rawMouse = new IMAPIC2D.Vec2();
                this.lastMouse = new IMAPIC2D.Vec2();
                this.posMouseDown = new IMAPIC2D.Vec2();
                this.lastCorner = null;
                this.modeResetCallbacks = $.Callbacks();
                this.mouseDown = false;
                this.mouseMoved = false;
                this.needUpdate = false;
                this.pixelsPerCm = 0.2;
                this.convertToClient2 = function (x, y) {
                    var pos = new IMAPIC2D.Vec2(x, y);
                    return pos.multiplyScalar(this.pixelsPerCm).sub(this.origin).add2(this.canvasJQ.offset().left, this.canvasJQ.offset().top);
                };
                this.scalePre = 1.0;
                this.canvasJQ = $("#" + engine.canvasId);
                this.canvasDOM = engine.canvasElement;
                this.wallSettingJQ = $("#" + engine.wallSettingId);
                this.roomSettingJQ = $("#" + engine.roomSettingId);
                var scope = this;
                this.canvasJQ.bind("mousedown", function (event) { scope.mousedown(event); });
                this.canvasJQ.bind("mousemove", function (event) { scope.mousemove(event); });
                this.canvasJQ.bind("mouseup", function (event) { scope.mouseup(event); });
                this.canvasJQ.bind("mouseleave", function () { scope.mouseleave(); });
                this.canvasDOM.addEventListener('touchstart', function (event) { scope.touchstart(event); }, false);
                this.canvasDOM.addEventListener('touchend', function (event) { scope.touchend(event); }, false);
                this.canvasDOM.addEventListener('touchmove', function (event) { scope.touchmove(event); }, false);
                this.canvasDOM.addEventListener('wheel', function (event) { scope.mousewheel(event); }, false);
                if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.floorplan.newCamera(this.target.x, this.target.y);
                }
                $(window).resize(function () { scope.handleWindowResize(); });
                $(document).keyup(function (e) {
                    if (e.keyCode == 27) {
                        scope.escapeKey();
                    }
                });
            }
            Handle.prototype.escapeKey = function () {
                this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
            };
            Handle.prototype.update = function () {
                this.engine.draw();
            };
            Handle.prototype.getMouseXY = function () {
                return this.curMouse;
            };
            Handle.prototype.handleWindowResize = function (w, h) {
                var canvasSel = this.canvasJQ;
                var parent = canvasSel.parent();
                canvasSel.height(parent.innerHeight());
                canvasSel.width(parent.innerWidth());
                this.canvasDOM.height = w !== undefined ? w : window.innerHeight;
                this.canvasDOM.width = h !== undefined ? h : window.innerWidth;
                this.updatePixelsPerCm();
                this.update();
            };
            Handle.prototype.updatePixelsPerCm = function () {
                this.pixelsPerCm = Math.min(this.canvasDOM.height, this.canvasDOM.width) / 1400.0;
            };
            Handle.prototype.resizeView = function (w, h) {
                this.handleWindowResize(w, h);
            };
            Handle.prototype.reset = function () {
                this.resizeView();
                this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
                this.resetOrigin();
                this.update();
            };
            Handle.prototype.resetOrigin = function () {
                var centerXY = new IMAPIC2D.Vec2(this.canvasJQ.innerWidth(), this.canvasJQ.innerHeight()).divideScalar(2.0);
                this.origin.subVectors(this.floorplan.getCenterOrSize(true).multiplyScalar(this.pixelsPerCm), centerXY);
            };
            Handle.prototype.setMode = function (mode) {
                this.lastCorner = null;
                this.mode = mode;
                this.modeResetCallbacks.fire(mode);
                this.updateTarget();
            };
            Handle.prototype.noAcitve = function () {
                return this.active.corner == null && this.active.inWall == null && this.active.wall == null && this.active.camera == null && this.active.sector == null;
            };
            Handle.prototype.mousewheel = function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.handleScale(event.deltaY);
            };
            Handle.prototype.mousedown = function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (event.button !== 0) {
                    if (this.lastCorner !== null) {
                        if (this.lastCorner.adjacentWalls().length < 1) {
                            this.lastCorner.remove();
                        }
                        this.lastCorner = null;
                    }
                    this.mouseDown = false;
                    this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
                    return;
                }
                this.handleMouseDown(event.clientX, event.clientY);
            };
            Handle.prototype.convertToClient = function (pos) {
                return pos.multiplyScalar(this.pixelsPerCm).sub(this.origin).add2(this.canvasJQ.offset().left, this.canvasJQ.offset().top);
            };
            Handle.prototype.convertFromClient = function (pos) {
                return new IMAPIC2D.Vec2(pos.x - this.canvasJQ.offset().left, pos.y - this.canvasJQ.offset().top).add(this.origin).divideScalar(this.pixelsPerCm);
            };
            Handle.prototype.updateRoom = function () {
                this.floorplan.update();
                this.update();
            };
            Handle.prototype.mouseup = function (event) {
                event.preventDefault();
                this.mouseDown = false;
                this.canvasJQ.css('cursor', 'default');
                this.handleMouseUp(event.clientX, event.clientY);
            };
            Handle.prototype.mouseleave = function () {
                this.mouseDown = false;
                this.canvasJQ.css('cursor', 'Default');
            };
            Handle.prototype.setMouseCursor = function () {
                var mouseCursorStr = 'default';
                if (this.noAcitve()) {
                    mouseCursorStr = mouseCursorStr;
                }
                else {
                    if (this.active.corner !== null || this.active.inWall !== null || this.active.camera !== null || this.active.sector !== null) {
                        mouseCursorStr = 'move';
                    }
                    else if (this.active.wall !== null) {
                        mouseCursorStr = this.SetCursorStyleByWallDirection(this.active.wall);
                    }
                }
                this.canvasJQ.css('cursor', mouseCursorStr);
            };
            Handle.prototype.mousemove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.mouseMoved = true;
                this.setMouseCursor();
                this.computeRawCurMouse(event.clientX, event.clientY);
                if (this.mouseDown && this.noAcitve()) {
                    this.event_move_canvas();
                    return;
                }
                if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.event_move_camera();
                }
                else {
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                        this.updateTarget();
                    }
                    else {
                        if (this.mouseDown) {
                            this.updateTarget();
                            this.event_move();
                        }
                        else {
                            this.event_getActive();
                        }
                    }
                }
            };
            Handle.prototype.touchstart = function (event) {
                event.preventDefault();
                switch (event.touches.length) {
                    case 1:
                        this.handleTouchStart(event.touches[0].pageX, event.touches[0].pageY);
                        break;
                    case 2:
                        break;
                }
            };
            Handle.prototype.touchend = function (event) {
                event.preventDefault();
                switch (event.touches.length) {
                    case 0:
                        this.handleMouseUp(this.rawMouse.x, this.rawMouse.y);
                        break;
                    case 1:
                        break;
                }
            };
            Handle.prototype.touchmove = function (event) {
                event.preventDefault();
                switch (event.touches.length) {
                    case 1:
                        this.handleTouchMove(event.touches[0].pageX, event.touches[0].pageY);
                        break;
                    case 2:
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        this.handleScale(this.scalePre - distance);
                        this.scalePre = distance;
                        break;
                }
            };
            Handle.prototype.handleScale = function (value) {
                this.pixelsPerCm += value < 0 ? 0.01 : -0.01;
                this.pixelsPerCm = Math.max(0.2, Math.min(1.0, this.pixelsPerCm));
                this.update();
            };
            Handle.prototype.event_delete = function () {
                var needUpdateRoom = true;
                if (this.active.corner) {
                    var curCorner = this.active.corner;
                    curCorner.adjacentWalls().forEach(function (wall) {
                        var corner = wall.oppositeCorner(curCorner);
                        wall.remove();
                        corner.recomputeOutlinePoints();
                    });
                    curCorner.remove();
                }
                else if (this.active.wall) {
                    var corner1 = this.active.wall.getStart();
                    var corner2 = this.active.wall.getEnd();
                    this.active.wall.remove();
                    corner1.recomputeOutlinePoints();
                    corner2.recomputeOutlinePoints();
                }
                else if (this.active.inWall) {
                    this.active.inWall.remove();
                }
                else {
                    needUpdateRoom = false;
                    this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
                }
                if (this.active.corner || this.active.wall) {
                    this.floorplan.getInWall().forEach(function (item) {
                        item.recompute();
                    });
                }
                return needUpdateRoom;
            };
            Handle.prototype.event_move_canvas = function () {
                this.origin.add(this.lastMouse).sub(this.rawMouse);
                this.lastMouse.copy(this.rawMouse);
                this.update();
            };
            Handle.prototype.event_move_camera = function () {
                if (this.active.camera) {
                    var position = {
                        x: this.curMouse.x + IMAPIC2D._DEFINES_.CAMERA.WIDTH,
                        y: this.curMouse.y
                    };
                    this.active.camera.move(position.x, position.y);
                    this.active.camera.callback.fire(position);
                }
                else if (this.active.sector) {
                    var point = new IMAPIC2D.Vec2(this.curMouse.x - this.floorplan.camera.x, this.curMouse.y - this.floorplan.camera.y);
                    this.floorplan.camera.drag(point);
                }
            };
            Handle.prototype.event_move = function () {
                if (this.active.corner) {
                    var activeCorner = this.active.corner;
                    if (activeCorner.move(this.curMouse.x, this.curMouse.y)) {
                        activeCorner.adjacentWalls().forEach(function (wall) {
                            wall.onItems.forEach(function (item) {
                                item.recompute();
                            });
                        });
                        this.floorplan.getRooms().forEach(function (room) {
                            if (IMAPIC2D.Core.Utils.hasValue(room.corners, activeCorner)) {
                                room.update();
                            }
                        });
                    }
                }
                else if (this.active.wall) {
                    var activeWall = this.active.wall;
                    var relativePos = this.rawMouse.clone().sub(this.lastMouse).divideScalar(this.pixelsPerCm);
                    if (activeWall.relativeMove(relativePos)) {
                        this.lastMouse.copy(this.rawMouse);
                        var walls = activeWall.getStart().adjacentWalls().concat(activeWall.getEnd().adjacentWalls());
                        walls.forEach(function (wall) {
                            wall.onItems.forEach(function (item) {
                                item.recompute();
                            });
                        });
                        var updateRooms = [];
                        var _startCorner = activeWall.getStart();
                        var _endCorner = activeWall.getEnd();
                        this.floorplan.getRooms().forEach(function (room) {
                            var corners = room.corners;
                            for (var i = 0; i < corners.length; i++) {
                                if ((corners[i] == _startCorner || corners[i] == _endCorner) && !IMAPIC2D.Core.Utils.hasValue(updateRooms, room)) {
                                    updateRooms.push(room);
                                }
                            }
                        });
                        updateRooms.forEach(function (room) {
                            room.update();
                        });
                    }
                }
                else if (this.active.inWall) {
                    var curInWall = this.active.inWall;
                    var attachedWall = curInWall.wall;
                    var walls = this.floorplan.getWalls();
                    for (var i = 0; i < walls.length; i++) {
                        var wall = walls[i];
                        if (attachedWall != wall && wall.distanceFromPoint(this.curMouse) < IMAPIC2D._DEFINES_.TOLERANCE.INWALL_ATTACH) {
                            attachedWall = wall;
                            break;
                        }
                    }
                    var needMove = true;
                    var items = attachedWall.onItems;
                    for (var i = 0; i < items.length; i++) {
                        var inwall = items[i];
                        if ((inwall != curInWall) && (inwall.getLine().center().distanceTo(this.curMouse) < (inwall.getLength() + curInWall.getLength()) / 2.0)) {
                            needMove = false;
                            break;
                        }
                    }
                    if (needMove) {
                        if (attachedWall !== curInWall.wall) {
                            curInWall.updateAttachedWall(attachedWall);
                        }
                        this.active.inWall.relativeMove(this.curMouse.x, this.curMouse.y);
                    }
                }
                else {
                }
            };
            Handle.prototype.event_getActive = function () {
                if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.active.camera = this.getCameraActiveItem(this.floorplan.getCamera(), this.active.camera);
                    this.active.sector = this.getSectorActiveItem(this.floorplan.getCamera(), this.active.sector);
                }
                else {
                    this.active.corner = this.getActiveItem(this.floorplan.getCorners(), this.active.corner);
                    if (this.active.corner == null) {
                        this.active.inWall = this.getActiveItem(this.floorplan.getInWall(), this.active.inWall);
                        if (this.active.inWall == null) {
                            this.active.wall = this.getActiveItem(this.floorplan.getWalls(), this.active.wall);
                        }
                        else {
                            this.active.wall = null;
                        }
                    }
                    else {
                        this.active.inWall = null;
                        this.active.wall = null;
                    }
                }
                if (this.needUpdate) {
                    this.update();
                }
            };
            Handle.prototype.event_create_corner = function () {
                var corner = this.floorplan.newCorner(this.target.x, this.target.y);
                var needUpdateRoom = corner.mergeWithIntersected(IMAPIC2D._DEFINES_.TOLERANCE.CORNER);
                if (this.lastCorner !== null && this.lastCorner.distanceTo(corner) > IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER) {
                    this.floorplan.newWall(this.lastCorner, corner);
                }
                this.lastCorner = corner;
                if (needUpdateRoom) {
                    this.floorplan.update();
                }
                this.update();
            };
            Handle.prototype.event_select = function (x, y) {
                var curPos = this.convertFromClient(new IMAPIC2D.Vec2(x, y));
                this.selected.room = this.getSelectedRoom(curPos);
                if (this.selected.room != null) {
                    this.roomSettingJQ.css('left', x + 40);
                    this.roomSettingJQ.css('top', y);
                    this.roomSettingJQ.css('display', 'block');
                }
                else {
                    this.roomSettingJQ.css('display', 'none');
                    var selectedWall = this.floorplan.hoverOnItem(this.curMouse, this.floorplan.getWalls());
                    if (this.selected.wall != selectedWall) {
                        this.selected.wall = selectedWall;
                        this.update();
                    }
                }
            };
            Handle.prototype.handleMouseDown = function (x, y) {
                this.mouseDown = true;
                this.mouseMoved = false;
                for (var key in this.selected) {
                    this.selected[key] = null;
                }
                this.posMouseDown.set(x, y);
                this.lastMouse.copy(this.rawMouse);
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE) {
                    if (this.event_delete()) {
                        this.updateRoom();
                    }
                }
            };
            Handle.prototype.handleMouseUp = function (x, y) {
                this.mouseDown = false;
                this.mouseMoved = false;
                var posMouseUp = new IMAPIC2D.Vec2(x, y);
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                    this.event_create_corner();
                }
                else if (posMouseUp.equals(this.posMouseDown)) {
                    this.event_select(x, y);
                }
            };
            Handle.prototype.handleTouchEnd = function (x, y) {
                this.mouseDown = false;
                this.mouseMoved = false;
                var posMouseUp = new IMAPIC2D.Vec2(x, y);
                if (posMouseUp.equals(this.posMouseDown)) {
                    if (this.mode !== IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                        this.event_select(x, y);
                    }
                }
                else {
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                        this.event_create_corner();
                    }
                }
            };
            Handle.prototype.computeRawCurMouse = function (x, y) {
                this.rawMouse.set(x, y);
                this.curMouse = this.convertFromClient(this.rawMouse);
            };
            Handle.prototype.handleTouchMove = function (x, y) {
                this.mouseDown = true;
                this.mouseMoved = true;
                this.computeRawCurMouse(x, y);
                this.updateTarget();
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                }
                else if (this.noAcitve()) {
                    this.origin.add(this.lastMouse).sub(this.rawMouse);
                    this.lastMouse.copy(this.rawMouse);
                }
                else if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.event_move_camera();
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                    this.event_move();
                }
            };
            Handle.prototype.handleTouchStart = function (x, y) {
                this.mouseDown = true;
                this.mouseMoved = false;
                this.posMouseDown.set(x, y);
                this.computeRawCurMouse(x, y);
                this.updateTarget();
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE) {
                    this.event_getActive();
                    if (this.event_delete()) {
                        this.updateRoom();
                    }
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                }
                else {
                    this.event_getActive();
                }
                this.lastMouse.set(x, y);
            };
            Handle.prototype.updateTarget = function () {
                var dis = new IMAPIC2D.Vec2(Infinity, Infinity);
                this.alignCorners.snap1 = null;
                this.alignCorners.snap2 = null;
                var snapped = {
                    x: false,
                    y: false
                };
                var curPos = this.curMouse;
                var corners = this.floorplan.getCorners();
                for (var i = 0; i < corners.length; i++) {
                    var item = corners[i];
                    var disX = Math.abs(curPos.x - item.x);
                    var disY = Math.abs(curPos.y - item.y);
                    if (disX < IMAPIC2D._DEFINES_.TOLERANCE.MOUSE_SNAP && disY < dis.y) {
                        curPos.x = item.x;
                        this.alignCorners.snap1 = item;
                        dis.y = disY;
                        snapped.x = true;
                    }
                    if (disY < IMAPIC2D._DEFINES_.TOLERANCE.MOUSE_SNAP && disX < dis.x) {
                        curPos.y = item.y;
                        this.alignCorners.snap2 = item;
                        dis.x = disX;
                        snapped.y = true;
                    }
                }
                this.target.copy(curPos);
                if (!(snapped.x && snapped.y) && this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW && this.lastCorner) {
                    var line = new IMAPIC2D.Line(this.lastCorner, this.curMouse);
                    var minDis = 1.0;
                    var len = Math.round(line.length() / minDis) * minDis;
                    line.end = line.scale(len).add(line.start);
                    var angle = line.slope();
                    var tmp = 180.0 / Math.PI;
                    var a = Math.round(angle * tmp) / tmp;
                    var p = line.end.rotateAround(line.start, a - angle);
                    this.target.copy(p);
                }
                this.update();
            };
            Handle.prototype.getSelectedRoom = function (curPos) {
                var rooms = this.floorplan.getRooms();
                for (var i = 0; i < rooms.length; i++) {
                    var room = rooms[i];
                    if (IMAPIC2D.Core.Utils.isPointInsidePolygon(curPos, room.innerPoints)) {
                        return room;
                    }
                }
                return null;
            };
            Handle.prototype.getActiveItem = function (items, curItem) {
                var hover = this.floorplan.hoverOnItem(this.curMouse, items);
                if (hover != curItem) {
                    this.needUpdate = true;
                    return hover;
                }
                this.needUpdate = false;
                return curItem;
            };
            Handle.prototype.getCameraActiveItem = function (items, curItem) {
                var hover = this.floorplan.cameraHoverOnItem(this.curMouse, items);
                if (hover != curItem) {
                    this.needUpdate = true;
                    return hover;
                }
                this.needUpdate = false;
                return curItem;
            };
            Handle.prototype.getSectorActiveItem = function (items, curItem) {
                var hover = this.floorplan.sectorHoverOnItem(this.curMouse, items);
                if (hover != curItem) {
                    this.needUpdate = true;
                    return hover;
                }
                this.needUpdate = false;
                return curItem;
            };
            Handle.prototype.SetCursorStyleByWallDirection = function (wall) {
                var quatPI = Math.PI / 8.0;
                var angle = wall.getLine().slope();
                angle = Math.abs(angle - Math.PI);
                if (angle < quatPI) {
                    return 'n-resize';
                }
                else if (angle < quatPI * 3) {
                    return 'sw-resize';
                }
                else if (angle < quatPI * 5) {
                    return 'w-resize';
                }
                else if (angle < quatPI * 7) {
                    return 'nw-resize';
                }
                else {
                    return 'n-resize';
                }
            };
            Handle.prototype.convert = function (x, y) {
                var vec = y !== undefined ? new IMAPIC2D.Vec2(x, y) : x.clone();
                return vec.multiplyScalar(this.pixelsPerCm).sub(this.origin);
            };
            Handle.prototype.convert2cm = function (x, y) {
                var vec = y !== undefined ? new IMAPIC2D.Vec2(x, y) : x.clone();
                return vec.clone().add(this.origin).divideScalar(this.pixelsPerCm);
            };
            return Handle;
        }());
        EventHandle.Handle = Handle;
    })(EventHandle = IMAPIC2D.EventHandle || (IMAPIC2D.EventHandle = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Core;
    (function (Core) {
        var Draw = (function () {
            function Draw(context) {
                this.context = context;
            }
            Draw.prototype.drawLines = function (lines, width, color) {
                if (lines.length < 1)
                    return;
                this.context.beginPath();
                for (var i = 0; i < lines.length; i++) {
                    this.context.moveTo(lines[i].start.x, lines[i].start.y);
                    this.context.lineTo(lines[i].end.x, lines[i].end.y);
                }
                this.context.lineWidth = width;
                this.context.strokeStyle = color;
                this.context.stroke();
                this.context.closePath();
            };
            Draw.prototype.drawCircle = function (center, radius, style, isFill, strokeWidth) {
                this.context.beginPath();
                this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
                if (isFill !== false) {
                    this.context.fillStyle = style;
                    this.context.fill();
                }
                else {
                    this.context.lineWidth = strokeWidth;
                    this.context.strokeStyle = style;
                    this.context.stroke();
                }
                this.context.closePath();
            };
            Draw.prototype.drawDashLine = function (pt1, pt2, width, color, dashLen) {
                dashLen = dashLen === undefined ? 5 : dashLen;
                var beveling = pt1.distanceTo(pt2);
                var num = Math.floor(beveling / dashLen);
                this.context.lineWidth = width;
                this.context.strokeStyle = color;
                this.context.beginPath();
                for (var i = 0; i < num; i++) {
                    this.context[i % 2 == 0 ? 'moveTo' : 'lineTo'](pt1.x + (pt2.x - pt1.x) / num * i, pt1.y + (pt2.y - pt1.y) / num * i);
                }
                this.context.stroke();
                this.context.closePath();
            };
            Draw.prototype.drawAngleBetweenLines = function (p0, p1, center) {
                var line1 = new IMAPIC2D.Line(center, p0);
                var line2 = new IMAPIC2D.Line(center, p1);
                var slope1 = line1.slope();
                var slope2 = line2.slope();
                var angle = Math.abs(slope2 - slope1);
                var ccw = angle < Math.PI ? false : true;
                var startAngle = slope1 < slope2 ? slope1 : slope2;
                var endAngle = slope1 < slope2 ? slope2 : slope1;
                var _angle = ccw ? Math.PI * 2.0 - angle : angle;
                var _LENGTH = 30;
                var p = line1.scale(_LENGTH + 10).add(center);
                p.rotateAround(center, (_angle) / 2.0);
                var tmpPos = p;
                _angle *= 180.0 / Math.PI;
                var a = Math.round(_angle);
                var str = "" + a + "°";
                this.context.font = "normal 12px Arial";
                this.context.fillStyle = "#000000";
                this.context.textBaseline = "middle";
                this.context.textAlign = "center";
                this.context.strokeStyle = "#ffffff";
                this.context.lineWidth = 4;
                this.context.strokeText(str, tmpPos.x, tmpPos.y);
                this.context.fillText(str, tmpPos.x, tmpPos.y);
                this.context.beginPath();
                this.context.arc(center.x, center.y, _LENGTH, startAngle, endAngle, ccw);
                this.context.lineWidth = 1.0;
                this.context.strokeStyle = '#ff0000';
                this.context.stroke();
                this.context.closePath();
            };
            Draw.prototype.calculateGridOffset = function (n, gridSpacing) {
                if (n >= 0) {
                    return (n + gridSpacing / 2.0) % gridSpacing - gridSpacing / 2.0;
                }
                else {
                    return (n - gridSpacing / 2.0) % gridSpacing + gridSpacing / 2.0;
                }
            };
            Draw.prototype.getPointAround = function (p, center, angle) {
                var p0 = p.clone().add(center);
                var p1 = p0.clone().rotateAround(center, angle);
                var p2 = p0.clone().rotateAround(center, angle - Math.PI);
                return [p1, p2];
            };
            Draw.prototype.drawCamera = function (image, camera, relative, angle, rotate) {
                this.context.save();
                this.context.translate(relative.x, relative.y);
                this.context.rotate(rotate * Math.PI / 180);
                this.context.translate(-relative.x, -relative.y);
                this.context.drawImage(image, relative.x - camera.WIDTH, relative.y - camera.HEIGHT / 2, camera.WIDTH, camera.HEIGHT);
                this.context.save();
                this.context.translate(relative.x, relative.y);
                this.context.rotate(-angle / 2 * Math.PI / 180);
                this.context.translate(-relative.x, -relative.y);
                this.context.beginPath();
                this.context.moveTo(relative.x, relative.y);
                this.context.arc(relative.x, relative.y, camera.RADIUS, 0, angle * Math.PI / 180);
                this.context.restore();
                this.context.fillStyle = camera.COLOR;
                this.context.globalAlpha = camera.ALPHA;
                this.context.fill();
                this.context.restore();
            };
            return Draw;
        }());
        Core.Draw = Draw;
    })(Core = IMAPIC2D.Core || (IMAPIC2D.Core = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Engine = (function () {
        function Engine(options) {
            var _this = this;
            this.enableChange = true;
            this.showWallLabels = true;
            this.showCenter = false;
            this.canvasId = options.canvasId;
            this.wallSettingId = options.wallSettingDivId;
            this.roomSettingId = options.roomSettingDivId;
            this.canvasElement = document.getElementById(options.canvasId);
            this.context = this.canvasElement.getContext('2d');
            this.drawBasic = new IMAPIC2D.Core.Draw(this.context);
            this.CameraImage = new Image();
            this.CameraImage.src = IMAPIC2D._DEFINES_.CAMERA.SRC;
            this.CameraImage.onload = function () {
                _this.draw();
            };
            this.floorplan = new IMAPIC2D.Items.Floorplan();
            this.handle = new IMAPIC2D.EventHandle.Handle(this, this.floorplan);
            this.handle.handleWindowResize();
            console.log('VERSION:', IMAPIC2D._DEFINES_.VERSION);
        }
        Engine.prototype.setRoomName = function (str) {
            if (this.handle.selected.room) {
                this.handle.selected.room.nameStr = str;
                this.draw();
            }
        };
        Engine.prototype.getRoomsArea = function () {
            var area = 0.0;
            this.floorplan.getRooms().forEach(function (room) {
                area += room.area;
            });
            return area;
        };
        Engine.prototype.setPixelsPerCm = function (value) {
            this.handle.pixelsPerCm = value;
        };
        Engine.prototype.setEnableChange = function (isEnable) {
            this.enableChange = isEnable;
        };
        Engine.prototype.draw = function () {
            var _this = this;
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.drawGrid(this.handle.origin);
            this.floorplan.getRooms().forEach(function (room) {
                _this.drawRoom(room);
            });
            if (this.showCenter) {
                this.drawCenter(this.handle.origin);
            }
            this.drawWalls(this.floorplan.getWalls());
            if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                this.drawCamera(this.floorplan.getCamera());
            }
            this.drawCorners(this.floorplan.getCorners());
            this.drawWallLabels(this.floorplan.getWalls());
            this.floorplan.getInWall().forEach(function (inWallItem) {
                _this.drawItem(inWallItem);
            });
            if (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                this.drawTarget(this.handle.target);
            }
        };
        Engine.prototype.drawMousePos = function (pos) {
            this.context.font = "normal 12px Arial";
            this.context.fillStyle = "#000000";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 4;
            var tmpPos = this.handle.convert(pos);
            var x = Math.round(pos.x * 100) / 100.0;
            var y = Math.round(pos.y * 100) / 100.0;
            var str = "" + x + " , " + y;
            this.context.strokeText(str, tmpPos.x + 50, tmpPos.y);
            this.context.fillText(str, tmpPos.x + 50, tmpPos.y);
        };
        Engine.prototype.getColorByState = function (hover, json) {
            return hover == 2 ? json.COLOR_SELECT : hover == 1 ? (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE ? IMAPIC2D._DEFINES_.COLOR.DELETE : json.COLOR_HOVER) : json.COLOR;
        };
        Engine.prototype.drawPixelLines = function (lines, width, style) {
            if (lines.length < 1)
                return;
            this.context.beginPath();
            this.context.lineWidth = width;
            this.context.strokeStyle = style;
            for (var i = 0; i < lines.length; i++) {
                var start = this.handle.convert(lines[i].start);
                var end = this.handle.convert(lines[i].end);
                this.context.moveTo(start.x, start.y);
                this.context.lineTo(end.x, end.y);
            }
            this.context.stroke();
            this.context.closePath();
        };
        Engine.prototype.drawPixelPolygonStrip = function (Arr, isFill, style, strokeWidth) {
            if (Arr.length < 2)
                return;
            this.context.beginPath();
            var arr0 = this.handle.convert(Arr[0].x, Arr[0].y);
            this.context.moveTo(arr0.x, arr0.y);
            for (var i = 1; i < Arr.length; i++) {
                var arri = this.handle.convert(Arr[i].x, Arr[i].y);
                this.context.lineTo(arri.x, arri.y);
            }
            this.context.closePath();
            isFill = isFill || false;
            if (isFill) {
                this.context.fillStyle = style;
                this.context.fill();
            }
            else {
                this.context.lineWidth = strokeWidth;
                this.context.strokeStyle = style;
                this.context.stroke();
            }
        };
        Engine.prototype.drawPixelMultiPolygon = function (Arr, style) {
            if (Arr.length < 1)
                return;
            this.context.beginPath();
            for (var i = 0; i < Arr.length; i++) {
                var item = Arr[i];
                if (item.length > 3) {
                    var arr0 = this.handle.convert(item[0].x, item[0].y);
                    this.context.moveTo(arr0.x, arr0.y);
                    for (var j = 1; j < item.length; ++j) {
                        var arrj = this.handle.convert(item[j].x, item[j].y);
                        this.context.lineTo(arrj.x, arrj.y);
                    }
                }
            }
            this.context.closePath();
            this.context.fillStyle = style;
            this.context.fill();
        };
        Engine.prototype.drawCenter = function (origin) {
            var len = IMAPIC2D._DEFINES_.GRID.SPACING / 6;
            var x = -origin.x;
            var y = -origin.y;
            var line1 = new IMAPIC2D.Line().fromNumber(x - len, y, x + len, y);
            var line2 = new IMAPIC2D.Line().fromNumber(x, y - len, x, y + len);
            this.drawBasic.drawLines([line1, line2], IMAPIC2D._DEFINES_.GRID.LINE_WIDTH + 2, IMAPIC2D._DEFINES_.COLOR.DELETE);
        };
        Engine.prototype.drawGrid = function (origin) {
            var spacing = IMAPIC2D._DEFINES_.GRID.SPACING * this.handle.pixelsPerCm;
            var offsetX = this.drawBasic.calculateGridOffset(-origin.x, spacing);
            var offsetY = this.drawBasic.calculateGridOffset(-origin.y, spacing);
            var width = this.canvasElement.width;
            var height = this.canvasElement.height;
            var lines = [];
            for (var x = 0; x <= (width / spacing); x++) {
                var xx = spacing * x + offsetX;
                lines.push(new IMAPIC2D.Line().fromNumber(xx, 0, xx, height));
            }
            for (var y = 0; y <= (height / spacing); y++) {
                var yy = spacing * y + offsetY;
                lines.push(new IMAPIC2D.Line().fromNumber(0, yy, width, yy));
            }
            this.drawBasic.drawLines(lines, IMAPIC2D._DEFINES_.GRID.LINE_WIDTH, IMAPIC2D._DEFINES_.GRID.COLOR);
        };
        Engine.prototype.drawRoom = function (room) {
            this.drawPixelPolygonStrip(room.corners, true, IMAPIC2D._DEFINES_.ROOM.COLOR);
            this.drawRoomLabel(room.centroid, room.area, room.nameStr);
        };
        Engine.prototype.drawRoomLabel = function (pos, areas, name) {
            this.context.font = "normal 14px Arial";
            this.context.fillStyle = "#000000";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 4;
            var tmpPos = this.handle.convert(pos.x, pos.y);
            this.context.strokeText(name, tmpPos.x, tmpPos.y - 15);
            this.context.fillText(name, tmpPos.x, tmpPos.y - 15);
            var str = Math.round(areas * 0.01) / 100 + "m²";
            this.context.strokeText(str, tmpPos.x, tmpPos.y);
            this.context.fillText(str, tmpPos.x, tmpPos.y);
        };
        Engine.prototype.drawTarget = function (target) {
            var targetPos = this.handle.convert(target);
            var snap1 = this.handle.alignCorners.snap1;
            var align_item = IMAPIC2D._DEFINES_.ALIGN_LINE;
            if (snap1 !== null) {
                this.drawBasic.drawDashLine(this.handle.convert(snap1), targetPos, align_item.WIDTH, align_item.COLOR);
            }
            var snap2 = this.handle.alignCorners.snap2;
            if (snap2 !== null) {
                this.drawBasic.drawDashLine(this.handle.convert(snap2), targetPos, align_item.WIDTH, align_item.COLOR);
            }
            var target_item = IMAPIC2D._DEFINES_.TARGET;
            this.drawBasic.drawCircle(targetPos, target_item.RADIUS, target_item.COLOR, false, target_item.WIDTH);
            var lastNode = this.handle.lastCorner;
            if (lastNode !== null) {
                var lastPos = this.handle.convert(lastNode);
                this.drawBasic.drawLines([new IMAPIC2D.Line(lastPos, targetPos)], target_item.WIDTH, target_item.COLOR);
                var lineArrays = [];
                var fontLines = [];
                this.getHelpLineAndLabel(new IMAPIC2D.Line(lastNode, target), lineArrays, fontLines, IMAPIC2D._DEFINES_.WALL.THICKNESS);
                this.drawPixelLines(lineArrays, IMAPIC2D._DEFINES_.HELP_LINE.WIDTH, IMAPIC2D._DEFINES_.HELP_LINE.COLOR);
                this.drawWallLengthLabels(fontLines);
                var corners = lastNode.adjacentCorners();
                var corner0;
                if (corners !== null && corners.length > 0) {
                    corner0 = corners[0];
                }
                else {
                    corner0 = new IMAPIC2D.Vec2(lastNode.x - 300, lastNode.y);
                    var corner1 = new IMAPIC2D.Vec2(lastNode.x + 300, lastNode.y);
                    this.drawBasic.drawDashLine(this.handle.convert(corner0), this.handle.convert(corner1), IMAPIC2D._DEFINES_.ALIGN_LINE.WIDTH, IMAPIC2D._DEFINES_.ALIGN_LINE.COLOR);
                }
                this.drawBasic.drawAngleBetweenLines(this.handle.convert(corner0), targetPos, lastPos);
            }
        };
        Engine.prototype.drawCorners = function (corners) {
            var _this = this;
            if (corners.length < 1)
                return;
            var hover = false;
            var color = this.getColorByState(0, IMAPIC2D._DEFINES_.CORNER);
            var radius = IMAPIC2D._DEFINES_.CORNER.RADIUS;
            var unHovered = IMAPIC2D.Core.Utils.removeIf(corners, function (corner) {
                return corner === _this.handle.active.corner;
            });
            unHovered.forEach(function (corner) {
                var pixelPos = _this.handle.convert(corner.x, corner.y);
                _this.drawBasic.drawCircle(pixelPos, radius, color);
            });
            var hovered = this.handle.active.corner;
            if (hovered != null) {
                color = this.getColorByState(1, IMAPIC2D._DEFINES_.CORNER);
                radius = IMAPIC2D._DEFINES_.CORNER.RADIUS_HOVER;
                var pixelPos = this.handle.convert(hovered.x, hovered.y);
                this.drawBasic.drawCircle(pixelPos, radius, color);
            }
        };
        Engine.prototype.drawCamera = function (camera) {
            var _this = this;
            if (camera.length < 1)
                return;
            camera.forEach(function (cameras) {
                var pixelPos = _this.handle.convert(cameras.x, cameras.y);
                if (pixelPos.x !== 0) {
                    _this.drawBasic.drawCamera(_this.CameraImage, IMAPIC2D._DEFINES_.CAMERA, pixelPos, cameras.angles, cameras.rotate);
                }
            });
        };
        Engine.prototype.drawItem = function (item) {
            var hover = (item === this.handle.active.inWall) ? 1 : 0;
            var color = this.getColorByState(hover, IMAPIC2D._DEFINES_.IN_WALL);
            var type = item.getType();
            switch (type) {
                case 0:
                    this.drawDoorSingle(item, color);
                    break;
                case 1:
                    this.drawDoorDouble(item, color);
                    break;
                case 2:
                    this.drawDoorSliding(item, color);
                    break;
                case 10:
                    this.drawWindowNormal(item, color);
                    break;
                case 11:
                    this.drawWindowFrench(item, color);
                    break;
                case 12:
                    this.drawWindowBay(item, color);
                    break;
                default:
                    console.error('不支持的绘制类型：' + type);
                    break;
            }
        };
        Engine.prototype.drawDoorSingle = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            var center = this.handle.convert(line.start);
            var slope = line.slope();
            var radius = line.length() * this.handle.pixelsPerCm;
            this.context.lineWidth = 1;
            this.context.strokeStyle = color;
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, slope, slope + Math.PI / 2.0, false);
            this.context.stroke();
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var disVec = line.scale(width * 0.7);
            var p = line.end.clone().rotateAround(line.start, Math.PI / 2.0);
            var p1 = p.clone().add(disVec);
            var p2 = line.start.clone().add(disVec);
            this.drawPixelPolygonStrip([line.start, p, p1, p2], false, color, 1);
        };
        Engine.prototype.drawDoorDouble = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            var center1 = this.handle.convert(line.start);
            var center2 = this.handle.convert(line.end);
            var slope = line.slope();
            var radius = line.length() * this.handle.pixelsPerCm / 2.0;
            this.context.lineWidth = 1;
            this.context.strokeStyle = color;
            this.context.beginPath();
            this.context.arc(center1.x, center1.y, radius, slope, slope + Math.PI / 2.0, false);
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(center2.x, center2.y, radius, slope + Math.PI, slope + Math.PI / 2.0, true);
            this.context.stroke();
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var disVec = line.scale(width * 0.7);
            var p0 = line.center().rotateAround(line.start, Math.PI / 2.0);
            var p1 = p0.clone().add(disVec);
            var p2 = line.start.clone().add(disVec);
            this.drawPixelPolygonStrip([line.start, p0, p1, p2], false, color, 1);
            disVec = disVec.negate();
            p0 = line.center().rotateAround(line.end, -Math.PI / 2.0);
            p1 = p0.clone().add(disVec);
            p2 = line.end.clone().add(disVec);
            this.drawPixelPolygonStrip([line.end, p0, p1, p2], false, color, 1);
        };
        Engine.prototype.drawDoorSliding = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var lineArray = [];
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            lineArray.push(line1, line2, line3, line4);
            var doorLen = line.length();
            var scaler = width * 0.25;
            var lenVec = line.scale(doorLen * 0.66);
            var lenToStart = doorLen * (1.0 - 0.66) - 3.0;
            var p10 = line1.scale(scaler).add(line1.start);
            var p11 = line1.scale(scaler * 2.0).add(line1.start);
            var p12 = line1.scale(scaler * 3.0).add(line1.start);
            var p20 = line2.scale(scaler).add(line2.start);
            var p21 = line2.scale(scaler * 2.0).add(line2.start);
            var p22 = line2.scale(scaler * 3.0).add(line2.start);
            var s10 = new IMAPIC2D.Line(p10, p20).scale(lenToStart).add(p10);
            var e10 = lenVec.clone().add(s10);
            var s11 = new IMAPIC2D.Line(p11, p21).scale(lenToStart).add(p11);
            var e11 = lenVec.clone().add(s11);
            lineArray.push(new IMAPIC2D.Line(s10, e10));
            lineArray.push(new IMAPIC2D.Line(s10, s11));
            lineArray.push(new IMAPIC2D.Line(s11, e11));
            lineArray.push(new IMAPIC2D.Line(e11, e10));
            var s20 = new IMAPIC2D.Line(p21, p11).scale(lenToStart).add(p21);
            var e20 = lenVec.clone().negate().add(s20);
            var s21 = new IMAPIC2D.Line(p22, p12).scale(lenToStart).add(p22);
            var e21 = lenVec.clone().negate().add(s21);
            lineArray.push(new IMAPIC2D.Line(s20, e20));
            lineArray.push(new IMAPIC2D.Line(s20, s21));
            lineArray.push(new IMAPIC2D.Line(s21, e21));
            lineArray.push(new IMAPIC2D.Line(e21, e20));
            this.drawPixelLines(lineArray, 1, color);
        };
        Engine.prototype.drawWindowNormal = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            this.drawPixelLines([line, line1, line2, line3, line4], 1, color);
        };
        Engine.prototype.drawWindowFrench = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            var scaler = width * 0.33;
            var p1 = line1.scale(scaler).add(line1.start);
            var p2 = line2.scale(scaler).add(line2.start);
            var p3 = line1.scale(scaler).negate().add(line1.end);
            var p4 = line2.scale(scaler).negate().add(line2.end);
            var line5 = new IMAPIC2D.Line(p1, p2);
            var line6 = new IMAPIC2D.Line(p3, p4);
            var line7 = new IMAPIC2D.Line(line5.center(), line6.center());
            this.drawPixelLines([line1, line2, line3, line4, line5, line6, line7], 1, color);
        };
        Engine.prototype.drawWindowBay = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness;
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, '#ffffff');
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            var scaler = width * 0.33;
            var p1 = line1.scale(scaler).add(line1.start);
            var p2 = line2.scale(scaler).add(line2.start);
            var p3 = line1.scale(scaler).negate().add(line1.end);
            var p4 = line2.scale(scaler).negate().add(line2.end);
            var line5 = new IMAPIC2D.Line(p1, p2);
            var line6 = new IMAPIC2D.Line(p3, p4);
            var line7 = new IMAPIC2D.Line(line5.center(), line6.center());
            this.drawPixelLines([line1, line2, line3, line4, line5, line6, line7], 1, color);
        };
        Engine.prototype.drawWalls = function (walls) {
            var _this = this;
            if (walls.length < 1)
                return;
            var state = IMAPIC2D._DEFINES_.WALL;
            var unHovered = IMAPIC2D.Core.Utils.removeIf(walls, function (wall) {
                return wall === _this.handle.active.wall;
            });
            var lines = [];
            var points = [];
            unHovered.forEach(function (wall) {
                var _outline = wall.outline;
                var pnts = _outline.startPnts.concat(_outline.endPnts);
                points.push(pnts);
                _outline.lines.forEach(function (line) {
                    lines.push(line);
                });
            });
            this.drawPixelMultiPolygon(points, state.COLOR_FILL);
            this.drawPixelLines(lines, 1.2, state.COLOR);
            var scope = this;
            function drawPoly(wall, hoverState) {
                var _outline = wall.outline;
                var pnts = _outline.startPnts.concat(_outline.endPnts);
                scope.drawPixelMultiPolygon([pnts], scope.getColorByState(hoverState, state));
            }
            var selected = this.handle.selected.wall;
            var hovered = this.handle.active.wall;
            if (hovered) {
                drawPoly(hovered, 1);
            }
        };
        Engine.prototype.drawWallLabels = function (walls) {
            var _this = this;
            var helpLineArrays = [];
            var fontLinesArrays = [];
            walls.forEach(function (wall) {
                _this.getHelpLineAndLabel(wall.getLine(), helpLineArrays, fontLinesArrays, wall.thickness);
            });
            this.drawPixelLines(helpLineArrays, IMAPIC2D._DEFINES_.HELP_LINE.WIDTH, IMAPIC2D._DEFINES_.HELP_LINE.COLOR);
            this.drawWallLengthLabels(fontLinesArrays);
        };
        Engine.prototype.drawWallLengthLabels = function (lineArr) {
            var _this = this;
            this.context.font = "normal 12px Arial";
            this.context.fillStyle = "#000000";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 4;
            lineArr.forEach(function (line) {
                var tmpPos = _this.handle.convert(line.center());
                var slope = Math.asin((line.end.y - line.start.y) / line.length());
                var str = "" + Math.round(line.length() * 10.0);
                _this.context.save();
                _this.context.translate(tmpPos.x, tmpPos.y);
                _this.context.rotate(slope);
                _this.context.strokeText(str, 0, 0);
                _this.context.fillText(str, 0, 0);
                _this.context.restore();
            });
        };
        Engine.prototype.getHelpLineAndLabel = function (line, ArrLine, ArrLabel, wallThickness) {
            if (line.length() < 30) {
                return;
            }
            var helpLength = IMAPIC2D._DEFINES_.HELP_LINE.LENGTH;
            var lineLEN = line.scale(helpLength / 2.0);
            var lineLEN2 = line.scale(helpLength / 4.0);
            var lineOffset = line.scale(helpLength / 2.0 + wallThickness * this.handle.pixelsPerCm / 2.0);
            var _start = lineOffset.clone().add(line.start).rotateAround(line.start, Math.PI / 2);
            var _end = lineOffset.clone().add(line.end).rotateAround(line.end, Math.PI / 2);
            ArrLabel.push(new IMAPIC2D.Line(_start, _end));
            ArrLine.push(new IMAPIC2D.Line(_start, _end));
            ArrLine.push(_start.rotatedLine(lineLEN, Math.PI / 2.0));
            ArrLine.push(_start.rotatedLine(lineLEN2, Math.PI / 4.0));
            ArrLine.push(_end.rotatedLine(lineLEN, Math.PI / 2.0));
            ArrLine.push(_end.rotatedLine(lineLEN2, Math.PI / 4.0));
        };
        return Engine;
    }());
    IMAPIC2D.Engine = Engine;
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var RoomGenerator = (function () {
        function RoomGenerator(group, backFaceCulling) {
            this._group = group === undefined ? new THREE.Group() : group;
            this.backFaceCulling = backFaceCulling !== undefined ? backFaceCulling : true;
        }
        RoomGenerator.prototype.setGroundTexture = function (tex, n) {
            this.groundTexture = tex;
            this.groundTexRepeatN = n;
        };
        RoomGenerator.prototype.setWallTexture = function (tex, n) {
            this.wallTexture = tex;
            this.wallTexRepeatN = n;
        };
        RoomGenerator.prototype.updateTexture = function (texture, range, material) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.needsUpdate = true;
            texture.repeat.set(range.x / texture.image.width, range.x / texture.image.height);
            material.map = texture;
            material.needsUpdate = true;
        };
        RoomGenerator.prototype.createWallShape = function (w, h) {
            var points = [];
            points.push(new THREE.Vector2(0, h));
            points.push(new THREE.Vector2(0, 0));
            points.push(new THREE.Vector2(w, 0));
            points.push(new THREE.Vector2(w, h));
            return new THREE.Shape(points);
        };
        RoomGenerator.prototype.pushHolesToShape = function (shape, holes, isEdge1) {
            if (holes === undefined || !holes || holes.length < 0)
                return;
            var pointsArray = [];
            holes.forEach(function (hole) {
                var y_bot = hole["bottom"];
                var y_top = y_bot + hole["height"];
                var x_left = isEdge1 ? hole["offsetStart_1"] : hole["offsetStart_2"];
                var x_right = x_left + hole["length"];
                var leftTop = new THREE.Vector2(x_left, y_top);
                var leftBot = new THREE.Vector2(x_left, y_bot);
                var rightBot = new THREE.Vector2(x_right, y_bot);
                var rightTop = new THREE.Vector2(x_right, y_top);
                var points = [leftTop, leftBot, rightBot, rightTop];
                var path = new THREE.Path(points);
                shape.holes.push(path);
                pointsArray.push([hole["start"], hole["end"], hole["bottom"], hole["height"]]);
            });
            return pointsArray;
        };
        RoomGenerator.prototype.sideShapeToMesh = function (line, shape, mat, bot_dis, isInnerWall, isCW) {
            var geometry = new THREE.ShapeBufferGeometry(shape, 1);
            var angle = -line.slope();
            if (isInnerWall !== undefined && isCW !== undefined) {
                var a = isInnerWall == 1;
                var b = isCW == true;
                if (a == b) {
                    var index = [].slice.call(geometry.index.array).reverse();
                    geometry.setIndex(index);
                }
            }
            geometry.rotateY(angle);
            geometry.translate(line.start.x, bot_dis || 0, line.start.y);
            return new THREE.Mesh(geometry, mat);
        };
        RoomGenerator.prototype.addWallCornerStripMesh = function (points, wall_height, mat, callback) {
            for (var i = 0; i < points.length - 1; i++) {
                var line = new IMAPIC2D.Line().fromNumber(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                var shape = this.createWallShape(line.length(), wall_height);
                var mesh = this.sideShapeToMesh(line, shape, mat);
                callback(mesh, 'Wallx');
            }
        };
        RoomGenerator.prototype.addTopBot = function (points, wall_height, mat, botDistance, height, callback) {
            var shape = new THREE.Shape();
            shape.setFromPoints(points);
            var geo = new THREE.ShapeBufferGeometry(shape, 1);
            geo.rotateX(Math.PI / 2.0);
            var minDistance = 0.01;
            var bot = botDistance !== undefined ? botDistance : 0.0;
            if (bot > minDistance || botDistance === undefined) {
                var mat1 = mat.clone();
                if (mat1.side == THREE.FrontSide) {
                    mat1.side = THREE.BackSide;
                }
                var mesh = new THREE.Mesh(geo, mat1);
                mesh.translateY(bot);
                callback(mesh, 'Wallx');
            }
            var top = height !== undefined ? height + bot : wall_height + bot;
            if (top + minDistance < wall_height || height === undefined) {
                var mesh = new THREE.Mesh(geo, mat);
                mesh.translateY(top);
                callback(mesh, 'Wallx');
            }
        };
        RoomGenerator.prototype.addWallInOutEdgeMesh = function (p1, p2, wall_uuid, wall_height, mat, holes, isEdge1, callback, isInnerWall, isCW) {
            var line = new IMAPIC2D.Line().fromNumber(p1.x, p1.y, p2.x, p2.y);
            var shape = this.createWallShape(line.length(), wall_height);
            var _holes = this.pushHolesToShape(shape, holes, isEdge1);
            var mesh = this.sideShapeToMesh(line, shape, mat.clone(), 0, isInnerWall, isCW);
            mesh.uuid = wall_uuid;
            var scope = this;
            var range = this.recomputeShapeGeometryUVs(mesh.geometry);
            new THREE.TextureLoader().load(IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.WALL, function (texture) {
                scope.updateTexture(texture, range, mesh.material);
            });
            var str = (isInnerWall !== 0) ? 'Wall' : 'Wallx';
            callback(mesh, str);
            return _holes;
        };
        RoomGenerator.prototype.addHoleMesh = function (holes1, holes2, wall_height, wall_width, mat, callback) {
            if (holes1.length !== holes2.length) {
                console.error('洞口内外个数不一致？！！');
                return;
            }
            function toVec2(p) {
                return new IMAPIC2D.Vec2(p.x, p.y);
            }
            for (var i = 0; i < holes1.length; i++) {
                var positions = holes1[i];
                var height = positions[3];
                var bot = positions[2];
                var pStart = toVec2(positions[0]);
                var pEnd = toVec2(positions[1]);
                var line = new IMAPIC2D.Line(pStart, pEnd);
                var disVec = line.scale(wall_width / 2.0);
                var shape = this.createWallShape(wall_width, height);
                var front_Line = pStart.rotatedLine(disVec, Math.PI / 2.0);
                var front_mesh = this.sideShapeToMesh(front_Line, shape, mat, bot);
                callback(front_mesh, 'Wallx');
                var back_Line = pEnd.rotatedLine(disVec.negate(), Math.PI / 2.0);
                var back_mesh = this.sideShapeToMesh(back_Line, shape, mat, bot);
                callback(back_mesh, 'Wallx');
                var points = [front_Line.start, front_Line.end, back_Line.start, back_Line.end];
                this.addTopBot(points, wall_height, mat, bot, height, callback);
            }
        };
        RoomGenerator.prototype.generateWall = function (group, wall, inWalls, callback) {
            var scope = this;
            var _starts = wall.start;
            var _ends = wall.end;
            var matFront = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20 });
            var matBack = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20, side: THREE.BackSide });
            var matDouble = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20, side: THREE.DoubleSide });
            var matHoleDouble = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            var pnts = _starts.concat(_ends);
            this.addTopBot(pnts, wall.height, matDouble, undefined, undefined, callback);
            this.addWallCornerStripMesh(_starts, wall.height, matFront, callback);
            this.addWallCornerStripMesh(_ends, wall.height, matFront, callback);
            var matWall = matFront;
            var isInner1, isInner2;
            var isCW = wall.isCW;
            var roomCount = wall.usedByRooms;
            if (!isCW) {
                if (roomCount !== 1) {
                    isInner1 = 1;
                    isInner2 = 2;
                }
                else {
                    isInner1 = 1;
                    isInner2 = 0;
                }
            }
            else {
                if (roomCount !== 1) {
                    isInner1 = 2;
                    isInner2 = 1;
                }
                else {
                    isInner1 = 0;
                    isInner2 = 1;
                }
            }
            var matWall1 = matFront;
            var matWall2 = matFront;
            if (this.backFaceCulling) {
                matWall1 = isInner1 ? matFront : matBack;
                matWall2 = isInner2 ? matFront : matBack;
            }
            var pnts1 = this.addWallInOutEdgeMesh(_starts[_starts.length - 1], _ends[0], wall.id, wall.height, matWall1, inWalls, true, callback, isInner1, isCW);
            var pnts2 = this.addWallInOutEdgeMesh(_starts[0], _ends[_ends.length - 1], wall.id, wall.height, matWall2, inWalls, false, callback, isInner2, isCW);
            this.addHoleMesh(pnts1, pnts2, wall.height, wall.width, matFront, callback);
        };
        RoomGenerator.prototype.ceilPowerOfTwo = function (value) {
            return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
        };
        RoomGenerator.prototype.recomputeShapeGeometryUVs = function (geometry) {
            var uvs = geometry.attributes['uv'].array;
            var uvArr = [].slice.call(uvs);
            var min = new THREE.Vector2(Infinity, Infinity);
            var max = new THREE.Vector2(-Infinity, -Infinity);
            for (var i = 0; i < uvArr.length; i += 2) {
                min.x = Math.min(uvArr[i], min.x);
                max.x = Math.max(uvArr[i], max.x);
                min.y = Math.min(uvArr[i + 1], min.y);
                max.y = Math.max(uvArr[i + 1], max.y);
            }
            var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
            var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
            for (var i = 0; i < uvArr.length; i += 2) {
                uvs[i] = (uvs[i] + offset.x) / range.x;
                uvs[i + 1] = (uvs[i + 1] + offset.y) / range.y;
            }
            return range;
        };
        RoomGenerator.prototype.generateRoom = function (room, callback) {
            var shape = new THREE.Shape();
            shape.setFromPoints(room.ground);
            var geometry = new THREE.ShapeBufferGeometry(shape, 1);
            geometry.rotateX(Math.PI / 2.0);
            var floorMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x333333, shininess: 20, side: THREE.DoubleSide });
            var floorMesh = new THREE.Mesh(geometry, floorMat);
            floorMesh.uuid = room.id;
            callback(floorMesh, 'Floor');
            var scope = this;
            var range = this.recomputeShapeGeometryUVs(geometry);
            new THREE.TextureLoader().load(IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.FLOOR, function (texture) {
                scope.updateTexture(texture, range, floorMat);
            });
            var roofGeo = geometry.clone();
            var roofMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x333333, shininess: 20, side: THREE.FrontSide });
            var roofMesh = new THREE.Mesh(roofGeo, roofMat);
            roofMesh.uuid = room.id;
            roofMesh.translateY(room.height);
            callback(roofMesh, 'Roof');
            return room.center;
        };
        return RoomGenerator;
    }());
    IMAPIC3D.RoomGenerator = RoomGenerator;
})(IMAPIC3D || (IMAPIC3D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var Engine = (function () {
        function Engine(container, width, height, pixelRatio) {
            this._enableBackCulling = false;
            this._sceneCenter = new THREE.Vector3();
            this._container = container;
            this._width = width;
            this._height = height;
            this._pixelRatio = pixelRatio;
        }
        Engine.prototype.init = function () {
            this.initScene();
            this.animate();
        };
        Engine.prototype.initScene = function () {
            this._camera = new THREE.PerspectiveCamera(60, this._width / this._height, 1, 1000000);
            this._camera.position.set(0, 200, 400);
            this._scene = new THREE.Scene();
            this._scene.add(new THREE.AmbientLight(0x444444));
            var dirLight = new THREE.DirectionalLight(0xffffff);
            dirLight.position.set(1, 1, 1);
            this._scene.add(dirLight);
            this._renderer = new THREE.WebGLRenderer({ antialias: true });
            this._renderer.setPixelRatio(this._pixelRatio);
            this._renderer.setSize(this._width, this._height);
            this._orbControls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
            this._orbControls.target.copy(this._sceneCenter);
            this._container.appendChild(this._renderer.domElement);
            window.addEventListener('resize', this.resize, false);
            this.resize();
        };
        Engine.prototype.resize = function () {
            this._width = window.innerWidth;
            this._height = window.innerHeight;
            this._camera.aspect = this._width / this._height;
            this._camera.updateProjectionMatrix();
            this._renderer.setSize(this._width, this._height);
        };
        Engine.prototype.loadFrom2D = function (str) {
        };
        Engine.prototype.clear = function () {
        };
        Engine.prototype.animate = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.animate(); });
            this._orbControls.update();
            this._renderer.render(this._scene, this._camera);
        };
        return Engine;
    }());
    IMAPIC3D.Engine = Engine;
})(IMAPIC3D || (IMAPIC3D = {}));
