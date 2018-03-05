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
            ADD_DOOR: 3.1,
            ADD_WINDOW: 3.2
        },
        CONFIG: {
            cmPerFoot: 30.48,
            pixelsPerFoot: 15.0
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
            RADIUS: 3,
            RADIUS_HOVER: 6,
            COLOR: "#ff0000",
            COLOR_HOVER: "#008cba"
        },
        WALL: {
            COLOR: "#888888",
            COLOR_FILL: "#dddddd",
            COLOR_HOVER: "#008cba",
            HEIGHT: 300,
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
            TYPE: {
                DOOR: 1,
                WINDOW: 2
            },
            COLOR: "#ffffff",
            COLOR_HOVER: "#008cba",
            DOOR: {
                WIDTH: 100.4,
                _HEIGHT: 210.2,
                _BOTTOM: 0
            },
            WINDOW: {
                WIDTH: 180,
                _HEIGHT: 195,
                _BOTTOM: 50
            }
        },
        TOLERANCE: {
            CORNER: 30,
            MOUSE_SNAP: 25,
            INWALL_ATTACH: 10,
            DISTANCE_HOVER: 20.0
        },
        HELP_LINE: {
            LENGTH: 50,
            WIDTH: 0.5,
            COLOR: "#bbbbbb"
        },
        ALIGN_LINE: {
            WIDTH: 1.5,
            COLOR: "#00cccc"
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
                this.initLength(type);
                this.computeStart();
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
            }
            InWall.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            InWall.prototype.getLine = function () {
                return new IMAPIC2D.Line(this.start, this.end);
            };
            InWall.prototype.initLength = function (type) {
                if (type == IMAPIC2D._DEFINES_.IN_WALL.TYPE.WINDOW) {
                    this.length = IMAPIC2D._DEFINES_.IN_WALL.WINDOW.WIDTH;
                }
                else if (type == IMAPIC2D._DEFINES_.IN_WALL.TYPE.DOOR) {
                    this.length = IMAPIC2D._DEFINES_.IN_WALL.DOOR.WIDTH;
                }
                else {
                    this.length = 100;
                }
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
                var line = this.wall.getLine();
                this.start.copy(line.start);
                this.end = line.scale(this.length).add(this.start);
            };
            InWall.prototype.compute = function (centerXY) {
                var line = this.wall.getLine();
                var scaleVec = line.scale(this.length / 2.0);
                var p = line.closestPointOnLine(centerXY);
                this.start.subVectors(p, scaleVec);
                this.end.addVectors(p, scaleVec);
                this.offset = p.distanceTo(line.start);
            };
            InWall.prototype.recompute = function () {
                var line = this.wall.getLine();
                this.start.addVectors(line.scale(this.offset - this.length / 2.0), line.start);
                this.end.addVectors(line.scale(this.offset + this.length / 2.0), line.start);
            };
            InWall.prototype.distanceFromPoint = function (point) {
                return this.getLine().distanceToPoint(point);
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
            function Room(corners) {
                this.corners = corners;
                this.centroid = new IMAPIC2D.Vec2();
                this.area = 0;
                this.innerPoints = [];
                this.walls = [];
                this.nameStr = "未命名";
                this.update();
            }
            Room.prototype.update = function () {
                this.updateAttachedWalls();
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
                    var p = wall.edge1.center();
                    if (IMAPIC2D.Core.Utils.isPointInsidePolygon(p, _this.corners)) {
                        wall.edge1.type = 0;
                        wall.edge2.type = 1;
                    }
                    else {
                        wall.edge1.type = 1;
                        wall.edge2.type = 0;
                    }
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
                var line0 = wall.edge1.type == 0 ? wall.edge1 : wall.edge2;
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
            Room.prototype.updateArea = function (contour) {
                var n = contour.length;
                var a = 0.0;
                for (var p = n - 1, q = 0; q < n; p = q++) {
                    a += contour[p].cross(contour[q]);
                }
                this.area = Math.abs(a * 0.5);
                return this.area;
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
            function Wall(start, end) {
                this.start = start;
                this.end = end;
                this.usedByRooms = 0;
                this.onItems = [];
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
                this.slope = 0.0;
                this.id = this.getUuid();
                this.start.attachStart(this);
                this.end.attachEnd(this);
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
                return [this.start.id, this.end.id].join();
            };
            Wall.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            Wall.prototype.snapToAxis = function (tolerance) {
            };
            Wall.prototype.relativeMove = function (d) {
                this.start.relativeMove(d.x, d.y);
                this.end.relativeMove(d.x, d.y);
            };
            Wall.prototype.remove = function () {
                this.start.detachWall(this);
                this.end.detachWall(this);
                this.callbacks.delete.fire(this);
            };
            Wall.prototype.distanceFromPoint = function (point) {
                return this.getLine().distanceToPoint(point);
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
        var Floorplan = (function () {
            function Floorplan() {
                this.index = 0;
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
                this.roomList = IMAPIC2D.Core.Utils.map(roomCorners, function (corners) {
                    return new Items.Room(corners);
                });
            };
            Floorplan.prototype.hoverOnItem = function (pos, items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].distanceFromPoint(pos) < IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER) {
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
            Floorplan.prototype.newWall = function (start, end) {
                var _this = this;
                var wall = new Items.Wall(start, end);
                this.wallList.push(wall);
                wall.fireOnType('delete', function () { IMAPIC2D.Core.Utils.removeValue(_this.wallList, wall); });
                return wall;
            };
            Floorplan.prototype.getWalls = function () {
                return this.wallList;
            };
            Floorplan.prototype.newInWall = function (type, wall) {
                var _this = this;
                if (!wall) {
                    wall = this.wallList[this.index];
                    if (!wall) {
                        alert('没有找到编号为' + this.index + '的墙！\n请【先绘制墙】，再添加墙上物体！');
                        return;
                    }
                }
                var item = new Items.InWall(wall, type);
                wall.onItems.push(item);
                this.inWallList.push(item);
                item.fireOnType('delete', function () {
                    IMAPIC2D.Core.Utils.removeValue(_this.inWallList, item);
                    IMAPIC2D.Core.Utils.removeValue(wall.onItems, item);
                });
                return item;
            };
            Floorplan.prototype.getInWall = function () {
                return this.inWallList;
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
                    corners: {},
                    walls: []
                };
                this.cornerList.forEach(function (corner) {
                    floorplan.corners[corner.id] = {
                        'x': corner.x,
                        'y': corner.y
                    };
                });
                this.wallList.forEach(function (wall) {
                    floorplan.walls.push({
                        'corner1': wall.getStart().id,
                        'corner2': wall.getEnd().id
                    });
                });
                return floorplan;
            };
            Floorplan.prototype.loadFloorplan = function (floorplan) {
                var _this = this;
                this.clear();
                var corners = {};
                if (floorplan == null || !('corners' in floorplan) || !('walls' in floorplan)) {
                    return;
                }
                for (var id in floorplan.corners) {
                    var corner = floorplan.corners[id];
                    corners[id] = this.newCorner(corner.x, corner.y, id);
                }
                floorplan.walls.forEach(function (wall) {
                    _this.newWall(corners[wall.corner1], corners[wall.corner2]);
                });
                this.update();
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
                this.move(this.x + dx, this.y + dy);
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
            Corner.prototype.mergeWithIntersected = function () {
                for (var i = 0, corners = this.floorplan.getCorners(); i < corners.length; i++) {
                    var corner = corners[i];
                    if (this !== corner && this.distanceFromPoint(corner.getPosition()) < IMAPIC2D._DEFINES_.TOLERANCE.CORNER) {
                        this.combineWithCorner(corner);
                        return true;
                    }
                }
                for (var i = 0, walls = this.floorplan.getWalls(); i < walls.length; i++) {
                    var wall = walls[i];
                    if (!this.isWallConnected(wall) && wall.distanceFromPoint(this.getPosition()) < IMAPIC2D._DEFINES_.TOLERANCE.CORNER) {
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
                    var side = line.getSide(p1);
                    if (wall.getStart() == this) {
                        wall.edge1.start = side < 0 ? p1 : p2;
                        wall.edge2.start = side > 0 ? p1 : p2;
                    }
                    else {
                        wall.edge1.end = side < 0 ? p1 : p2;
                        wall.edge2.end = side > 0 ? p1 : p2;
                    }
                }
                else {
                    var _walls = this.sortWalls(walls);
                    for (var i = 0, len = _walls.length; i < len; i++) {
                        var wall0 = _walls[i];
                        var wall1 = i + 1 == len ? _walls[0] : _walls[i + 1];
                        this.pushPointIntoTwoWalls(wall0, wall1);
                    }
                }
                walls.forEach(function (wall) {
                    wall.updateAddonPointAndLine();
                });
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
                    room: null
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
                this.pixelsPerCm = 0.49212598425;
                this.canvasJQ = $("#" + engine.canvasId);
                this.canvasDOM = engine.canvasElement;
                this.wallSettingJQ = $("#" + engine.wallSettingId);
                this.roomSettingJQ = $("#" + engine.roomSettingId);
                var scope = this;
                this.canvasJQ.bind("mousedown", function (event) { scope.mousedown(event); });
                this.canvasJQ.bind("mousemove", function (event) { scope.mousemove(event); });
                this.canvasJQ.bind("mouseup", function (event) { scope.mouseup(event); });
                this.canvasJQ.bind("mouseleave", function () { scope.mouseleave(); });
                this.canvasDOM.addEventListener('wheel', function (event) { scope.mousewheel(event); }, false);
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
            Handle.prototype.handleWindowResize = function () {
                var canvasSel = this.canvasJQ;
                var parent = canvasSel.parent();
                canvasSel.height(parent.innerHeight());
                canvasSel.width(parent.innerWidth());
                if (IMAPIC2D._DEFINES_.CUR_DEBUG < IMAPIC2D._DEFINES_.DEBUG.LOW)
                    console.log('resized window');
                this.canvasDOM.height = window.innerHeight;
                this.canvasDOM.width = window.innerWidth;
                this.update();
            };
            Handle.prototype.resizeView = function () {
                this.handleWindowResize();
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
                return this.active.corner == null && this.active.inWall == null && this.active.wall == null;
            };
            Handle.prototype.updateTarget = function () {
                var corners = this.floorplan.getCorners();
                var dis = new IMAPIC2D.Vec2(5000000, 5000000);
                this.alignCorners.snap1 = null;
                this.alignCorners.snap2 = null;
                var curPos = this.curMouse;
                for (var i = 0; i < corners.length; i++) {
                    var item = corners[i];
                    var disY = Math.abs(curPos.y - item.y);
                    if (Math.abs(curPos.x - item.x) < IMAPIC2D._DEFINES_.TOLERANCE.MOUSE_SNAP && disY < dis.y) {
                        curPos.x = item.x;
                        this.alignCorners.snap1 = item;
                        dis.y = disY;
                    }
                    var disX = Math.abs(curPos.x - item.x);
                    if (Math.abs(curPos.y - item.y) < IMAPIC2D._DEFINES_.TOLERANCE.MOUSE_SNAP && disX < dis.x) {
                        curPos.y = item.y;
                        this.alignCorners.snap2 = item;
                        dis.x = disX;
                    }
                }
                this.target.copy(this.curMouse);
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW && this.lastCorner) {
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
            Handle.prototype.mousedown = function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.mouseDown = true;
                this.mouseMoved = false;
                this.posMouseDown.set(event.clientX, event.clientY);
                var needUpdateRoom = false;
                this.lastMouse.copy(this.rawMouse);
                if (event.button !== 0) {
                    if (this.lastCorner !== null && this.lastCorner.adjacentWalls().length < 1) {
                        this.lastCorner.remove();
                        this.lastCorner = null;
                    }
                    this.setMode(this.mode);
                    return;
                }
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE) {
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
                        this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
                    }
                    if (this.active.corner || this.active.wall) {
                        this.floorplan.getInWall().forEach(function (item) {
                            item.recompute();
                        });
                        needUpdateRoom = true;
                    }
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                    var corner = this.floorplan.newCorner(this.target.x, this.target.y);
                    needUpdateRoom = corner.mergeWithIntersected();
                    if (this.lastCorner !== null) {
                        var wall = this.floorplan.newWall(this.lastCorner, corner);
                    }
                    this.lastCorner = corner;
                }
                if (needUpdateRoom) {
                    this.floorplan.update();
                    this.update();
                }
            };
            Handle.prototype.mouseup = function (event) {
                this.mouseDown = false;
                this.canvasJQ.css('cursor', 'default');
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW)
                    return;
                var posMouseUp = new IMAPIC2D.Vec2(event.clientX, event.clientY);
                if (posMouseUp.equals(this.posMouseDown)) {
                    if (this.active.wall !== null) {
                    }
                    else {
                        var curPos = this.convertFromClient(posMouseUp);
                        var rooms = this.floorplan.getRooms();
                        var needShow = false;
                        for (var i = 0; i < rooms.length; i++) {
                            var room = rooms[i];
                            if (IMAPIC2D.Core.Utils.isPointInsidePolygon(curPos, room.innerPoints)) {
                                this.active.room = room;
                                this.roomSettingJQ.css('left', event.clientX);
                                this.roomSettingJQ.css('top', event.clientY);
                                needShow = true;
                                break;
                            }
                        }
                        if (needShow) {
                            this.roomSettingJQ.modal('show');
                        }
                        else {
                            this.active.room = null;
                            this.roomSettingJQ.modal('hide');
                        }
                        this.update();
                    }
                }
            };
            Handle.prototype.convertToClient = function (pos) {
                return pos.multiplyScalar(this.pixelsPerCm).sub(this.origin).add2(this.canvasJQ.offset().left, this.canvasJQ.offset().top);
            };
            Handle.prototype.convertFromClient = function (pos) {
                return new IMAPIC2D.Vec2(pos.x - this.canvasJQ.offset().left, pos.y - this.canvasJQ.offset().top).add(this.origin).divideScalar(this.pixelsPerCm);
            };
            Handle.prototype.mousemove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.mouseMoved = true;
                this.rawMouse.set(event.clientX, event.clientY);
                this.curMouse = this.convertFromClient(this.rawMouse);
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW || (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE && this.mouseDown)) {
                    this.updateTarget();
                }
                var mouseCursorStr = 'default';
                if (this.noAcitve()) {
                    mouseCursorStr = mouseCursorStr;
                }
                else {
                    if (this.active.corner !== null || this.active.inWall !== null) {
                        mouseCursorStr = 'move';
                    }
                    else if (this.active.wall !== null) {
                        mouseCursorStr = this.SetCursorStyleByWallDirection(this.active.wall);
                    }
                }
                this.canvasJQ.css('cursor', mouseCursorStr);
                if (this.mouseDown) {
                    this.needUpdate = true;
                    if (this.noAcitve()) {
                        this.origin.add(this.lastMouse).sub(this.rawMouse);
                        this.lastMouse.copy(this.rawMouse);
                    }
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                        if (this.active.corner) {
                            var activeCorner = this.active.corner;
                            activeCorner.move(this.curMouse.x, this.curMouse.y);
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
                        else if (this.active.wall) {
                            var activeWall = this.active.wall;
                            var relativePos = this.rawMouse.clone().sub(this.lastMouse).divideScalar(this.pixelsPerCm);
                            activeWall.relativeMove(relativePos);
                            this.lastMouse.copy(this.rawMouse);
                            var walls = activeWall.getStart().adjacentWalls().concat(activeWall.getEnd().adjacentWalls());
                            walls.forEach(function (wall) {
                                if (wall != activeWall) {
                                    wall.onItems.forEach(function (item) {
                                        item.recompute();
                                    });
                                }
                            });
                            this.floorplan.getRooms().forEach(function (room) {
                                if (IMAPIC2D.Core.Utils.hasValue(room.walls, activeWall)) {
                                    room.update();
                                }
                            });
                        }
                        else if (this.active.inWall) {
                            var walls = this.floorplan.getWalls();
                            for (var i = 0; i < walls.length; i++) {
                                var wall = walls[i];
                                if (wall.distanceFromPoint(this.curMouse) < IMAPIC2D._DEFINES_.TOLERANCE.INWALL_ATTACH) {
                                    this.active.inWall.updateAttachedWall(wall);
                                    break;
                                }
                            }
                            this.active.inWall.relativeMove(this.curMouse.x, this.curMouse.y);
                        }
                    }
                }
                else {
                    if (this.mode != IMAPIC2D._DEFINES_.EVENTS.DRAW) {
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
                    else {
                    }
                }
                if (this.needUpdate) {
                    this.update();
                }
            };
            Handle.prototype.mouseleave = function () {
                this.mouseDown = false;
                this.canvasJQ.css('cursor', 'Default');
            };
            Handle.prototype.mousewheel = function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.pixelsPerCm += event.deltaY < 0 ? 0.01 : -0.01;
                this.pixelsPerCm = Math.max(0.2, Math.min(1.0, this.pixelsPerCm));
                this.update();
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
            Draw.prototype.drawCurve2 = function (startX, startY, endX, endY, width, color, slope) {
                this.context.beginPath();
                this.context.moveTo(startX, startY);
                this.context.arc(startX, startY, 50, slope, Math.PI / 2 + slope, false);
                this.context.lineTo(startX, startY);
                this.context.strokeStyle = color;
                this.context.lineWidth = width;
                this.context.stroke();
            };
            Draw.prototype.drawCurve3 = function (startX, startY, endX, endY, width, color, slope) {
                this.context.beginPath();
                this.context.moveTo(startX, startY);
                this.context.arc(startX, startY, 25, slope, Math.PI / 2 + slope, false);
                this.context.lineTo(startX, startY);
                this.context.moveTo(endX, endY);
                this.context.arc(endX, endY, 25, slope - 1.5 * Math.PI, Math.PI / 2 + slope - 1.5 * Math.PI, false);
                this.context.strokeStyle = color;
                this.context.lineWidth = width;
                this.context.stroke();
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
            this.canvasId = options.canvasId;
            this.wallSettingId = options.wallSettingDivId;
            this.roomSettingId = options.roomSettingDivId;
            this.canvasElement = document.getElementById(options.canvasId);
            this.context = this.canvasElement.getContext('2d');
            this.drawBasic = new IMAPIC2D.Core.Draw(this.context);
            this.floorplan = new IMAPIC2D.Items.Floorplan();
            this.handle = new IMAPIC2D.EventHandle.Handle(this, this.floorplan);
            this.handle.handleWindowResize();
        }
        Engine.prototype.setRoomName = function (str) {
            if (this.handle.active.room) {
                this.handle.active.room.nameStr = str;
                this.draw();
            }
        };
        Engine.prototype.draw = function () {
            var _this = this;
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.drawGrid(this.handle.origin);
            this.floorplan.getRooms().forEach(function (room) {
                _this.drawRoom(room);
            });
            this.drawCenter(this.handle.origin);
            this.drawWalls(this.floorplan.getWalls());
            this.drawCorners(this.floorplan.getCorners());
            this.drawWallLabels(this.floorplan.getWalls());
            this.floorplan.getInWall().forEach(function (inWallItem) {
                _this.drawItem(inWallItem);
            });
            if (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                this.drawTarget(this.handle.target);
            }
        };
        Engine.prototype.getColorByState = function (hover, json) {
            return hover ? (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE ? IMAPIC2D._DEFINES_.COLOR.DELETE : json.COLOR_HOVER) : json.COLOR;
        };
        Engine.prototype.drawPixelLines = function (lines, width, style) {
            if (lines.length < 1)
                return;
            this.context.beginPath();
            for (var i = 0; i < lines.length; i++) {
                var start = this.handle.convert(lines[i].start);
                var end = this.handle.convert(lines[i].end);
                this.context.moveTo(start.x, start.y);
                this.context.lineTo(end.x, end.y);
            }
            this.context.closePath();
            this.context.lineWidth = width;
            this.context.strokeStyle = style;
            this.context.stroke();
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
        Engine.prototype.drawPixelCurve3 = function (start, end, width, color, slope) {
            var _start = this.handle.convert(start);
            var _end = this.handle.convert(end);
            var halfPI = Math.PI / 2.0;
            this.context.beginPath();
            this.context.moveTo(_start.x, _start.y);
            this.context.arc(_start.x, _start.y, 25, slope, halfPI + slope, false);
            this.context.lineTo(_start.x, _start.y);
            this.context.moveTo(_end.x, _end.y);
            this.context.arc(_end.x, _end.y, 25, slope + halfPI, slope + Math.PI, false);
            this.context.lineTo(_end.x, _end.y);
            this.context.closePath();
            this.context.strokeStyle = color;
            this.context.lineWidth = width;
            this.context.stroke();
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
            var alignLine = [];
            if (this.handle.alignCorners.snap1 !== null) {
                alignLine.push(new IMAPIC2D.Line(this.handle.alignCorners.snap1, target));
            }
            if (this.handle.alignCorners.snap2 !== null) {
                alignLine.push(new IMAPIC2D.Line(this.handle.alignCorners.snap2, target));
            }
            alignLine.length > 0 && this.drawPixelLines(alignLine, IMAPIC2D._DEFINES_.ALIGN_LINE.WIDTH, IMAPIC2D._DEFINES_.ALIGN_LINE.COLOR);
            var item = IMAPIC2D._DEFINES_.TARGET;
            var targetPos = this.handle.convert(target);
            this.drawBasic.drawCircle(targetPos, item.RADIUS, item.COLOR, false, item.WIDTH);
            var lastNode = this.handle.lastCorner;
            if (lastNode !== null) {
                var lastPos = this.handle.convert(lastNode);
                this.drawBasic.drawLines([new IMAPIC2D.Line(lastPos, targetPos)], item.WIDTH, item.COLOR);
                var lineArrays = [];
                var fontLines = [];
                this.getHelpLineAndLabel(new IMAPIC2D.Line(lastNode, target), lineArrays, fontLines);
                var help_item = IMAPIC2D._DEFINES_.HELP_LINE;
                this.drawPixelLines(lineArrays, help_item.WIDTH, help_item.COLOR);
                this.drawWallLengthLabels(fontLines);
                var corners = lastNode.adjacentCorners();
                var corner0;
                if (corners !== null && corners.length > 0) {
                    corner0 = corners[0];
                }
                else {
                    corner0 = new IMAPIC2D.Vec2(lastNode.x - 300, lastNode.y);
                    var corner1 = new IMAPIC2D.Vec2(lastNode.x + 300, lastNode.y);
                    this.drawPixelLines([new IMAPIC2D.Line(corner0, corner1)], IMAPIC2D._DEFINES_.ALIGN_LINE.WIDTH, IMAPIC2D._DEFINES_.ALIGN_LINE.COLOR);
                }
                var orginPos = this.handle.convert(corner0);
                this.drawBasic.drawAngleBetweenLines(orginPos, targetPos, lastPos);
            }
        };
        Engine.prototype.drawCorners = function (corners) {
            var _this = this;
            if (corners.length < 1)
                return;
            var hover = false;
            var color = this.getColorByState(false, IMAPIC2D._DEFINES_.CORNER);
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
                color = this.getColorByState(true, IMAPIC2D._DEFINES_.CORNER);
                radius = IMAPIC2D._DEFINES_.CORNER.RADIUS_HOVER;
                var pixelPos = this.handle.convert(hovered.x, hovered.y);
                this.drawBasic.drawCircle(pixelPos, radius, color);
            }
        };
        Engine.prototype.drawItem = function (item) {
            var hover = (item === this.handle.active.inWall);
            var color = this.getColorByState(hover, IMAPIC2D._DEFINES_.IN_WALL);
            if (IMAPIC2D._DEFINES_.IN_WALL.TYPE.DOOR == item.getType()) {
                this.drawDoor(item, color);
            }
            else if (IMAPIC2D._DEFINES_.IN_WALL.TYPE.WINDOW == item.getType()) {
                this.drawWindow(item, color);
            }
            else {
                console.error('不支持的绘制类型：' + item.getType());
            }
        };
        Engine.prototype.drawDoor = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness * this.handle.pixelsPerCm;
            this.drawPixelLines([line], width, color);
        };
        Engine.prototype.drawWindow = function (item, color) {
            var line = item.getLine();
            var width = item.wall.thickness * this.handle.pixelsPerCm;
            this.drawPixelLines([line], width, color);
            var disVec = line.scale(item.wall.thickness / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            this.drawPixelLines([line, line1, line2, line3, line4], 1, '#888888');
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
            var hovered = this.handle.active.wall;
            if (hovered != null) {
                var _outline = hovered.outline;
                var pnts = _outline.startPnts.concat(_outline.endPnts);
                this.drawPixelMultiPolygon([pnts], this.getColorByState(true, state));
            }
        };
        Engine.prototype.drawWallLabels = function (walls) {
            var _this = this;
            var helpLineArrays = [];
            var fontLinesArrays = [];
            walls.forEach(function (wall) {
                _this.getHelpLineAndLabel(wall.getLine(), helpLineArrays, fontLinesArrays);
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
                var str = "" + Math.round(line.length() * 10.0);
                _this.context.strokeText(str, tmpPos.x, tmpPos.y);
                _this.context.fillText(str, tmpPos.x, tmpPos.y);
            });
        };
        Engine.prototype.getHelpLineAndLabel = function (line, ArrLine, ArrLabel) {
            if (line.length() < 30) {
                return;
            }
            var helpLength = IMAPIC2D._DEFINES_.HELP_LINE.LENGTH;
            var lineLEN = line.scale(helpLength / 2.0);
            var lineLEN2 = line.scale(helpLength / 4.0);
            var lineOffset = line.scale(helpLength / 2.0 + IMAPIC2D._DEFINES_.WALL.THICKNESS * this.handle.pixelsPerCm / 2.0);
            var _start = lineOffset.clone().add(line.start).rotateAround(line.start, Math.PI / 2);
            var _end = lineOffset.clone().add(line.end).rotateAround(line.end, Math.PI / 2);
            ArrLabel.push(new IMAPIC2D.Line(_start, _end));
            ArrLine.push(new IMAPIC2D.Line(_start, _end));
            ArrLine.push(_start.rotatedLine(lineLEN, Math.PI / 2.0));
            ArrLine.push(_start.rotatedLine(lineLEN2, Math.PI / 4.0));
            ArrLine.push(_end.rotatedLine(lineLEN, Math.PI / 2.0));
            ArrLine.push(_end.rotatedLine(lineLEN2, Math.PI / 4.0));
        };
        Engine.prototype.convertTo3d = function () {
            var floorplan = {
                walls: [],
                rooms: []
            };
            var scope = this;
            var center = this.handle.convert(0, 0);
            function _convert(pts) {
                return IMAPIC2D.Core.Utils.map(pts, function (pt) { return _convert_pt(pt); });
            }
            function _convert_pt(pt) {
                return pt.toJson();
            }
            this.floorplan.getRooms().forEach(function (room) {
                var groundPoints = _convert(room.innerPoints);
                var roomStruct = {
                    ground: groundPoints,
                };
                floorplan.rooms.push(roomStruct);
                room.getWalls().forEach(function (wall) {
                    wall.usedByRooms++;
                });
            });
            this.floorplan.getWalls().forEach(function (wall) {
                var _outline = wall.outline;
                var _starts = _convert(_outline.startPnts);
                var _ends = _convert(_outline.endPnts);
                var _doors = [];
                var _windows = [];
                var offsets = wall.computeEdgeOffsetStart();
                wall.onItems.forEach(function (inWallItem) {
                    var position = _convert([inWallItem.start, inWallItem.end]);
                    var _offsetStart = inWallItem.start.distanceTo(wall.getStartXY());
                    var struct = {
                        start: _convert_pt(inWallItem.start),
                        end: _convert_pt(inWallItem.end),
                        bottom: 0,
                        height: 0,
                        length: inWallItem.getLength(),
                        offsetStart_1: _offsetStart + offsets["offset_1"],
                        offsetStart_2: _offsetStart + offsets["offset_2"]
                    };
                    if (inWallItem.type == IMAPIC2D._DEFINES_.IN_WALL.TYPE.DOOR) {
                        var _key = IMAPIC2D._DEFINES_.IN_WALL.DOOR;
                        struct.bottom = _key._BOTTOM;
                        struct.height = _key._HEIGHT;
                        _doors.push(struct);
                    }
                    else if (inWallItem.type == IMAPIC2D._DEFINES_.IN_WALL.TYPE.WINDOW) {
                        var _key = IMAPIC2D._DEFINES_.IN_WALL.WINDOW;
                        struct.bottom = _key._BOTTOM;
                        struct.height = _key._HEIGHT;
                        _windows.push(struct);
                    }
                });
                var side = wall.usedByRooms == 1 ? wall.edge1.type : 2;
                var wallStruct = {
                    start: _starts,
                    end: _ends,
                    side: side,
                    height: wall.height,
                    width: wall.thickness,
                    windows: _windows,
                    doors: _doors
                };
                floorplan.walls.push(wallStruct);
            });
            return JSON.stringify(floorplan);
        };
        return Engine;
    }());
    IMAPIC2D.Engine = Engine;
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var RoomGenerator = (function () {
        function RoomGenerator(group) {
            this._group = group === undefined ? new THREE.Group() : group;
        }
        RoomGenerator.prototype.createWallShape = function (w, h) {
            var points = [];
            points.push(new THREE.Vector2(0, h));
            points.push(new THREE.Vector2(0, 0));
            points.push(new THREE.Vector2(w, 0));
            points.push(new THREE.Vector2(w, h));
            if (THREE.ShapeUtils.isClockWise(points)) {
                points.reverse();
            }
            return new THREE.Shape(points);
        };
        RoomGenerator.prototype.pushHolesToShape = function (shape, holes, isEdge1) {
            var pointsArray = [];
            if (holes && holes.length > 0) {
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
            }
            return pointsArray;
        };
        RoomGenerator.prototype.sideShapeToMesh = function (line, shape, mat, bot_dis) {
            var geometry = new THREE.ShapeBufferGeometry(shape, 1);
            geometry.rotateY(Math.PI * 2.0 - line.slope());
            geometry.translate(line.start.x, bot_dis || 0, line.start.y);
            return new THREE.Mesh(geometry, mat);
        };
        RoomGenerator.prototype.generateWall = function (group, wall) {
            var scope = this;
            var _starts = wall.start;
            var _ends = wall.end;
            var _height = wall.height;
            var _width = wall.width;
            var _side = wall.side;
            function addWallCornerStripMesh(points, mat) {
                for (var i = 0; i < points.length - 1; i++) {
                    var line = new IMAPIC2D.Line().fromNumber(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                    var shape = scope.createWallShape(line.length(), _height);
                    group.add(scope.sideShapeToMesh(line, shape, mat));
                }
            }
            function addTopBot(points, mat, botDistance, height) {
                var shape = new THREE.Shape();
                shape.setFromPoints(points);
                var geo = new THREE.ShapeBufferGeometry(shape, 1);
                geo.rotateX(Math.PI / 2.0);
                var minDistance = 0.01;
                var bot = botDistance !== undefined ? botDistance : 0.0;
                if (bot > minDistance || botDistance === undefined) {
                    var mesh = new THREE.Mesh(geo, mat);
                    mesh.translateY(bot);
                    group.add(mesh);
                }
                var top = height !== undefined ? height + bot : _height + bot;
                if (top + minDistance < _height || height === undefined) {
                    var mesh = new THREE.Mesh(geo, mat);
                    mesh.translateY(top);
                    group.add(mesh);
                }
            }
            function addWallInOutEdgeMesh(p1, p2, mat, holes, isEdge1) {
                var line = new IMAPIC2D.Line().fromNumber(p1.x, p1.y, p2.x, p2.y);
                var shape = scope.createWallShape(line.length(), _height);
                var _holes = scope.pushHolesToShape(shape, holes, isEdge1);
                group.add(scope.sideShapeToMesh(line, shape, mat));
                return _holes;
            }
            function addHoleMesh(holes1, holes2, mat) {
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
                    var disVec = line.scale(_width / 2.0);
                    var front_Line = pStart.rotatedLine(disVec, Math.PI / 2.0);
                    var shape = scope.createWallShape(_width, height);
                    group.add(scope.sideShapeToMesh(front_Line, shape, mat, bot));
                    var back_Line = pEnd.rotatedLine(disVec.negate(), Math.PI / 2.0);
                    var shape = scope.createWallShape(_width, height);
                    group.add(scope.sideShapeToMesh(back_Line, shape, mat, bot));
                    var points = [front_Line.start, front_Line.end, back_Line.start, back_Line.end];
                    addTopBot(points, mat, bot, height);
                }
            }
            var matFront = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20 });
            var matBack = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20, side: THREE.BackSide });
            var matDouble = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 20, side: THREE.DoubleSide });
            var matHoleDouble = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            var pnts = _starts.concat(_ends);
            addTopBot(pnts, matDouble);
            addWallCornerStripMesh(_starts, matFront);
            addWallCornerStripMesh(_ends, matFront);
            var mat1 = _side == 0 ? matFront : _side == 1 ? matBack : matDouble;
            var holes = wall.windows.concat(wall.doors);
            var pnts1 = addWallInOutEdgeMesh(_starts[_starts.length - 1], _ends[0], mat1, holes, true);
            var pnts2 = addWallInOutEdgeMesh(_starts[0], _ends[_ends.length - 1], mat1, holes, false);
            addHoleMesh(pnts1, pnts2, matHoleDouble);
            function getHoleMatrix(holes, width, heigth, thickness) {
                var matArray = [];
                var matrix0 = new THREE.Matrix4().makeTranslation(width / 2.0, 0, 0);
                holes.forEach(function (hole) {
                    var p1 = hole["start"];
                    var p2 = hole["end"];
                    var line = new IMAPIC2D.Line().fromNumber(p1.x, p1.y, p2.x, p2.y);
                    var matrix1 = new THREE.Matrix4().makeRotationY(Math.PI * 2.0 - line.slope());
                    var matrix2 = new THREE.Matrix4().makeTranslation(line.start.x, hole["bottom"], line.start.y);
                    var _mat = matrix2.multiply(matrix1).multiply(matrix0);
                    matArray.push(_mat);
                });
                return matArray;
            }
            var inwallItem = IMAPIC2D._DEFINES_.IN_WALL;
            return {
                windowMatrice: getHoleMatrix(wall.windows, inwallItem.WINDOW.WIDTH, inwallItem.WINDOW._HEIGHT, 24),
                doorMatrice: getHoleMatrix(wall.doors, inwallItem.DOOR.WIDTH, inwallItem.DOOR._HEIGHT, 24)
            };
        };
        RoomGenerator.prototype.generateRoom = function (group, room) {
            var scope = this;
            var shape = new THREE.Shape();
            shape.setFromPoints(room.ground);
            var geometry = new THREE.ShapeBufferGeometry(shape, 1);
            geometry.rotateX(Math.PI / 2.0);
            var matGround = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x333333, shininess: 20, side: THREE.DoubleSide });
            var mesh = new THREE.Mesh(geometry, matGround);
            group.add(mesh);
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
            this.clear();
            var data = JSON.parse(str);
            if (data == null || !('walls' in data)) {
                return;
            }
            var roomGroup = new THREE.Group();
            this._scene.add(roomGroup);
            var generator = new IMAPIC3D.RoomGenerator(roomGroup);
            data['walls'].forEach(function (wall) {
                generator.generateWall(roomGroup, wall);
            });
            if (!('rooms' in data)) {
                return;
            }
            data['rooms'].forEach(function (room) {
                generator.generateRoom(roomGroup, room);
            });
            this._orbControls.target.copy(this._sceneCenter);
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
