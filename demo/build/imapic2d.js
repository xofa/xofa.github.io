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
        MATH.EPSILON = Math.pow(2, -52);
        MATH.MIN = 1e-10;
        return MATH;
    }());
    IMAPIC2D.MATH = MATH;
    IMAPIC2D._DEFINES_ = {
        VERSION: 'ImaPic2D 5.0 DEV 2019/3/12 for designer ',
        DEFAULT_TEXTURE: {
            WALL: {
                MAP: '../static/images/texture/defaultWall.jpg',
                NORMAL: '../static/images/texture/wallN.jpg',
                UUID: '96B3B8A7-98A0-474D-B119-2DC0D09092D6',
                LIGHTMAP: '../static/images/texture/walllightmap.jpg'
            },
            FLOOR: {
                MAP: '../static/images/texture/defaultFloor.jpg',
                NORMAL: '../static/images/texture/floorN.jpg',
                UUID: '000FFA8B-555C-47CA-BF4D-34745FBD84A2'
            },
            ROOM: 'texture/1.jpg'
        },
        LIGHTS_RECT: {
            MIN_SIZE: 10,
            MIN_LENGTH: 120,
            MAX_LENGTH: 400,
            MAX_RECTS: 5
        },
        CUR_DEBUG: 2,
        DEBUG: {
            HIGH: 3.1,
            MIDDEL: 2.1,
            LOW: 1.1
        },
        EVENTS: {
            MOVE: -1,
            DRAW: -2,
            DRAW_ROOM: -5,
            DELETE: -3,
            CLEAR: -4,
            ADD_DOOR_DAN: 0,
            ADD_DOOR_DAN1: 0.1,
            ADD_DOOR_DAN2: 0.2,
            ADD_DOOR_DAN3: 0.3,
            ADD_DOOR_SHUANG: 1,
            ADD_DOOR_TUIYI: 2,
            ADD_DOOR_TUIYI1: 2.1,
            ADD_DOOR_TUIYI2: 2.2,
            ADD_DOOR_TUIYI3: 2.3,
            ADD_DOOR_YUSHI: 3,
            ADD_DOOR_CHUFANG: 4,
            ADD_DOOR_RUHU: 5,
            ADD_WINDOW_PUTONG: 10,
            ADD_WINDOW_PUTONG1: 10.1,
            ADD_WINDOW_PUTONG2: 10.2,
            ADD_WINDOW_PUTONG3: 10.3,
            ADD_WINDOW_LUODI: 11,
            ADD_WINDOW_LUODI1: 11.1,
            ADD_WINDOW_LUODI2: 11.2,
            ADD_WINDOW_LUODI3: 11.3,
            ADD_WINDOW_PIAO: 12,
            ADD_WINDOW_PIAO1: 12.1,
            ADD_WINDOW_PIAO2: 12.2,
            ADD_WINDOW_PIAO3: 12.3,
            ADD_DOOR_HOLE: 20,
            ADD_RECT_STRUCT: 30,
            ADD_DROPPEDCEILING: 40
        },
        COLOR: {
            DELETE: "#ff0000"
        },
        ROOM: {
            COLOR: "#ffffff"
        },
        TARGET: {
            WIDTH: 1,
            RADIUS: 6,
            COLOR: "#333333"
        },
        RECT_ROOM: {
            COLOR: "rgba(0,125,233,0.3)"
        },
        CORNER: {
            RADIUS: 0,
            RADIUS_HOVER: 6,
            COLOR: "#ff0000",
            COLOR_HOVER: "#008cba",
            COLOR_SELECT: "#00baba"
        },
        WALL: {
            COLOR: "#888888",
            COLOR_FILL: "#dddddd",
            COLOR_HOVER: "#000000",
            COLOR_SELECT: "#000000",
            HEIGHT: 280,
            THINCKNESS: 24.0,
            LENGTH_MIN: 50,
            LENGTH_MAX: 10000,
        },
        FOOT_LINE: {
            HEIGHT: 10,
            THICKNESS: 1,
            COLOR: '#FF0000'
        },
        CONSTRUCTION: {
            COLOR: "#888888",
            COLOR_HOVER: "#ff0000",
            COLOR_SELECT: "#000000",
            COLOR_FILL: "rgba(160,160,160,0.7)",
            COLOR_ROTATE_ARROW: "rgba(80,160,255,0.7)",
            COLOR_ROTATE_ARROW_HOVER: "#4444ff",
            ROTATE_ARROW_IR_RATIO: 0.6,
            ROTATE_ARROW_OR_RATIO: 0.75,
            COLOR_ROTATE_CIRCLE: "rgba(80,160,255,0.3)",
            COLOR_ROTATE_ROTATE: "rgba(80,160,255,1.0)",
            COLOR_EDGERECT_HOVER: "#00ff00",
            COLOR_EDGERECT: "#3333ff",
            EDGERECT_LEN: 15,
            DROPPEDCEILING: {
                TYPES: ["7DD1FF21-021E-4AE3-BB75-D78A6CA097B3",
                    "7DD1FF21-021E-4AE3-BB75-D78A6CA097B3",
                    "7DD1FF21-021E-4AE3-BB75-D78A6CA097B3"
                ]
            },
            0: {
                NAME: '梁',
                WIDTH: 65,
                HEIGHT: 65,
                LENGTH: 280,
                MIN_LEN: 50,
                MAX_LEN: 300,
            },
            1: {
                NAME: '柱子',
                WIDTH: 40,
                HEIGHT: 40,
                LENGTH: 80,
                MIN_LEN: 50,
                MAX_LEN: 300,
            },
            2: {
                NAME: '吊顶',
                WIDTH: 600,
                HEIGHT: 600,
                LENGTH: 40,
                MIN_LEN: 50,
                MAX_LEN: 3000,
            }
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
            COLOR: "#000000",
            COLOR_HOVER: "#63B8FF",
            COLOR_SELECT: "#5CACEE",
            COLOR_BASE: "#ffffff",
            MIN_DISTANCE_TO_WALL: 0.1,
            ITEMS: {
                0: {
                    name: '单开门',
                    WIDTH: 96,
                    WIDTH_MIN: 70,
                    WIDTH_MAX: 96,
                    _HEIGHT: 205,
                    _BOTTOM: 0,
                    UUID: '44EFED1C-849F-4176-B2D4-4254077E317B'
                },
                0.1: {
                    name: '灰色单开门',
                    WIDTH: 100,
                    _HEIGHT: 210,
                    _BOTTOM: 0,
                    UUID: '986CFB88-B5CF-4657-A719-65825E9ECFC3'
                },
                0.2: {
                    name: '米色单开门',
                    WIDTH: 100,
                    _HEIGHT: 210,
                    _BOTTOM: 0,
                    UUID: '0116DEAE-D370-4ECA-B01D-39E495F7CCE4'
                },
                0.3: {
                    name: '白色单开门',
                    WIDTH: 100,
                    _HEIGHT: 210,
                    _BOTTOM: 0,
                    UUID: '66F471F1-5D2A-4A8E-B950-9CB8ED4CFFC0'
                },
                1: {
                    name: '双开门',
                    WIDTH: 177.2,
                    _HEIGHT: 206.8,
                    _BOTTOM: 0,
                    UUID: '90D777D8-8DD1-40F4-B79F-3DF8D72A6142'
                },
                2: {
                    name: '推移门',
                    WIDTH: 160,
                    WIDTH_MIN: 140,
                    WIDTH_MAX: 320,
                    _HEIGHT: 240,
                    _BOTTOM: 0,
                    UUID: '6BDC7C85-995E-49F4-A7EB-426696C28424'
                },
                2.1: {
                    name: '白色推拉门',
                    WIDTH: 206,
                    _HEIGHT: 242,
                    _BOTTOM: 0,
                    UUID: '30D5DD7A-1F86-41B8-B9EC-43A0951F5DDB'
                },
                2.2: {
                    name: '黑色玻璃推拉门',
                    WIDTH: 160,
                    _HEIGHT: 209,
                    _BOTTOM: 0,
                    UUID: 'AA716EDC-2571-4DE0-99DE-0ADBB1C5E142'
                },
                2.3: {
                    name: '客厅推拉门',
                    WIDTH: 272,
                    _HEIGHT: 215,
                    _BOTTOM: 0,
                    UUID: '3445BDCD-67CF-4327-B751-2144FC116560'
                },
                3: {
                    name: '浴室门',
                    WIDTH: 145.4,
                    _HEIGHT: 240.9,
                    _BOTTOM: 0,
                    UUID: '53F9DF9C-52FE-4E85-9E53-C4D544FD1AE9'
                },
                4: {
                    name: '厨房门',
                    WIDTH: 88.2,
                    _HEIGHT: 236.4,
                    _BOTTOM: 0,
                    UUID: 'E508DA90-CA23-4316-BF91-0EDB19726CEA'
                },
                5: {
                    name: '入户门',
                    WIDTH: 93.6,
                    _HEIGHT: 210.2,
                    _BOTTOM: 0,
                    UUID: 'CC3897EC-8D6F-4E3F-BF57-F71D79E471D1'
                },
                10: {
                    name: '普通窗',
                    WIDTH: 135,
                    WIDTH_MIN: 120,
                    WIDTH_MAX: 180,
                    _HEIGHT: 145,
                    _BOTTOM: 90,
                    UUID: 'FAF5FE80-D5A4-47F6-8DC0-44DE1B4458D3'
                },
                10.1: {
                    name: '白色普通窗',
                    WIDTH: 40,
                    _HEIGHT: 90,
                    _BOTTOM: 90,
                    UUID: 'F714C1E8-8249-4947-93A0-D6832A347CB9'
                },
                10.2: {
                    name: '白色三开普通窗',
                    WIDTH: 138.5,
                    _HEIGHT: 150,
                    _BOTTOM: 80,
                    UUID: 'F5FDF549-4DAA-463A-BE50-F2D17A413096'
                },
                10.3: {
                    name: '白色多开普通窗',
                    WIDTH: 270,
                    _HEIGHT: 150,
                    _BOTTOM: 80,
                    UUID: '4B1B24C7-6280-4A3F-9C19-8B32A267E592'
                },
                11: {
                    name: '落地窗',
                    WIDTH: 180,
                    _HEIGHT: 210,
                    _BOTTOM: 30,
                    UUID: 'C55BD127-9890-462F-B3BB-2E815F116E7D'
                },
                11.1: {
                    name: '白色落地窗',
                    WIDTH: 97,
                    _HEIGHT: 210,
                    _BOTTOM: 10,
                    UUID: '6ED324D3-23B1-4B18-AE70-DB89AE12828E'
                },
                11.2: {
                    name: '白色双门落地窗',
                    WIDTH: 133,
                    _HEIGHT: 245,
                    _BOTTOM: 10,
                    UUID: '7B8C620F-2F1B-4862-B2BA-E8FA53543AC0'
                },
                11.3: {
                    name: '白色三门落地窗',
                    WIDTH: 280,
                    _HEIGHT: 220,
                    _BOTTOM: 10,
                    UUID: '3A19103D-BA89-4BED-8E61-0651B8BC4BA7'
                },
                12: {
                    name: '飘窗',
                    WIDTH: 149.8,
                    _HEIGHT: 180,
                    _BOTTOM: 40,
                    UUID: '27639D49-B297-4351-A2D3-52C1496C7401',
                },
                12.1: {
                    name: '主卧飘窗',
                    WIDTH: 248,
                    _HEIGHT: 179,
                    _BOTTOM: 50,
                    UUID: '1D63DB6A-1533-4333-8F9D-94F819C9BCEE'
                },
                12.2: {
                    name: '灰色飘窗',
                    WIDTH: 249.6,
                    _HEIGHT: 179,
                    _BOTTOM: 50,
                    UUID: 'F657D57A-EB8A-455D-888F-1522399EF62C'
                },
                12.3: {
                    name: '黑色飘窗',
                    WIDTH: 136,
                    _HEIGHT: 210,
                    _BOTTOM: 50,
                    UUID: '582E2724-C105-42E8-9FF4-98DD205D6745'
                },
                20: {
                    name: '门洞',
                    WIDTH: 150,
                    _HEIGHT: 180,
                    _BOTTOM: 0,
                    UUID: null
                }
            }
        },
        TOLERANCE: {
            CORNER: 30,
            MOUSE_SNAP: 25,
            INWALL_ATTACH: 10,
            INWALL_NEAR: 60,
            DISTANCE_HOVER: 30.0,
            EDGERECT: 20
        },
        HELP_LINE: {
            LENGTH: 40,
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
        },
        IMAGES: {
            SELECTED_CORNER: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAQAAACG58+YAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAlgAAAJYAJvGvrMAAAAHdElNRQfeBBoIJDj5Pc5EAAAAy0lEQVQoz7XPPytFcRgH8M+5jm5u1ttNSTEYlEGGO/IaLLoLWe5sUBYvQSQDL8CgLF6JDFIGpSizyL8rj8E53eN3Zt/t93nq93wfyrTtm1DLpk/bKc67Ex4sVrHpRAjhTGvIPW8Ff9goccplgSFcm4GG3QqGcChnxVPCL3q5ZRe+/7RqWMq0Evwd/GMyTVHXzJ65pEvmllXPyTmv1hlxkPCxUZh2VcEbs+Vva94LHOgPl4w5LfjceHX7gnvhUTftuuXLTv2wjiOT5eMHdilX/TYw3i4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjhUMjE6NTI6NTgrMDg6MDAOKHTvAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA0LTI2VDA4OjM2OjU2KzA4OjAwGTtWKAAAAEN0RVh0c29mdHdhcmUAL3Vzci9sb2NhbC9pbWFnZW1hZ2ljay9zaGFyZS9kb2MvSW1hZ2VNYWdpY2stNy8vaW5kZXguaHRtbL21eQoAAABjdEVYdHN2Zzpjb21tZW50ACBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIHILdZYAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADgzM8JkksYAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMzgzvjT0sQAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzk4NDcyNjE2E3XRKwAAABF0RVh0VGh1bWI6OlNpemUAOTQyMUI7SfV5AAAAYnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L25ld3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTUyMy8xMTUyMzc0LnBuZ7bm0vEAAAAASUVORK5CYII=',
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
            return this.start.equals(this.end);
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
        Line.prototype.closestPointOnLine = function (point, isInfinityLength) {
            if (isInfinityLength === void 0) { isInfinityLength = false; }
            var tDot = point.clone().sub(this.start).dot(this.dir());
            var tParam = this.lengthSq() != 0 ? tDot / this.lengthSq() : -1;
            if (isInfinityLength) {
                return this.dir().multiplyScalar(tParam).add(this.start);
            }
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
        Line.prototype.distanceToPoint = function (point, isInfinity) {
            isInfinity = isInfinity !== undefined ? isInfinity : false;
            return point.distanceTo(this.closestPointOnLine(point, isInfinity));
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
            if ((0 <= t && t <= 1) && (0 <= u && u <= 1)) {
                return r.clone().multiplyScalar(t).add(this.start);
            }
            return false;
        };
        Line.prototype.GetSnapPointOrNot = function (p0, p1, dir) {
            var line = new Line(p0, p1);
            var t0 = line.closestPointOnLine(dir.end);
            if (dir.dot(new Line(dir.end, t0)) > 0) {
                return t0;
            }
            return false;
        };
        Line.prototype.at = function (t, target) {
            return target.copy(this.scale(t)).add(this.start);
        };
        Line.prototype.intersectBox = function (box, target) {
            var tmin, tmax, tymin, tymax;
            var direction = this.dir();
            var invdirx = 1 / direction.x, invdiry = 1 / direction.y;
            var origin = this.start;
            if (invdirx >= 0) {
                tmin = (box.min.x - origin.x) * invdirx;
                tmax = (box.max.x - origin.x) * invdirx;
            }
            else {
                tmin = (box.max.x - origin.x) * invdirx;
                tmax = (box.min.x - origin.x) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (box.min.y - origin.y) * invdiry;
                tymax = (box.max.y - origin.y) * invdiry;
            }
            else {
                tymin = (box.max.y - origin.y) * invdiry;
                tymax = (box.min.y - origin.y) * invdiry;
            }
            if ((tmin > tymax) || (tymin > tmax))
                return null;
            if (tymin > tmin || tmin !== tmin)
                tmin = tymin;
            if (tymax < tmax || tmax !== tmax)
                tmax = tymax;
            if (tmax < 0)
                return null;
            if (target === undefined)
                target = new IMAPIC2D.Vec2();
            return this.at(tmin >= 0 ? tmin : tmax, target);
        };
        Line.prototype.GetRange = function () {
            return {
                min: {
                    x: Math.min(this.start.x, this.end.x),
                    y: Math.min(this.start.y, this.end.y)
                },
                max: {
                    x: Math.max(this.start.x, this.end.x),
                    y: Math.max(this.start.y, this.end.y)
                }
            };
        };
        Line.prototype.IsRectCross = function (p1, p2, q1, q2) {
            return Math.min(p1.x, p2.x) <= Math.max(q1.x, q2.x) &&
                Math.min(q1.x, q2.x) <= Math.max(p1.x, p2.x) &&
                Math.min(p1.y, p2.y) <= Math.max(q1.y, q2.y) &&
                Math.min(q1.y, q2.y) <= Math.max(p1.y, p2.y);
        };
        Line.prototype.IsLineCross = function (v) {
            if (this.getSide(v.start) * this.getSide(v.end) < 0) {
                return true;
            }
            return false;
        };
        Line.prototype.IsLineSegmentCross = function (pFirst1, pFirst2, pSecond1, pSecond2) {
            var line1 = pFirst1.x * (pSecond1.y - pFirst2.y) +
                pFirst2.x * (pFirst1.y - pSecond1.y) +
                pSecond1.x * (pFirst2.y - pFirst1.y);
            var line2 = pFirst1.x * (pSecond2.y - pFirst2.y) +
                pFirst2.x * (pFirst1.y - pSecond2.y) +
                pSecond2.x * (pFirst2.y - pFirst1.y);
            if (((line1 ^ line2) >= 0) && !(line1 == 0 && line2 == 0))
                return false;
            line1 = pSecond1.x * (pFirst1.y - pSecond2.y) +
                pSecond2.x * (pSecond1.y - pFirst1.y) +
                pFirst1.x * (pSecond2.y - pSecond1.y);
            line2 = pSecond1.x * (pFirst2.y - pSecond2.y) +
                pSecond2.x * (pSecond1.y - pFirst2.y) +
                pFirst2.x * (pSecond2.y - pSecond1.y);
            if (((line1 ^ line2) >= 0) && !(line1 == 0 && line2 == 0))
                return false;
            return true;
        };
        Line.prototype.GetCrossPoint = function (lineq) {
            var p1 = this.start;
            var p2 = this.end;
            var q1 = lineq.start;
            var q2 = lineq.end;
            if (this.IsRectCross(p1, p2, q1, q2) && this.LineSegementsIntersect(lineq)) {
                var tmpLeft = (q2.x - q1.x) * (p1.y - p2.y) - (p2.x - p1.x) * (q1.y - q2.y);
                var tmpRight = (p1.y - q1.y) * (p2.x - p1.x) * (q2.x - q1.x) + q1.x * (q2.y - q1.y) * (p2.x - p1.x) - p1.x * (p2.y - p1.y) * (q2.x - q1.x);
                var x = tmpRight / tmpLeft;
                tmpLeft = (p1.x - p2.x) * (q2.y - q1.y) - (p2.y - p1.y) * (q1.x - q2.x);
                tmpRight = p2.y * (p1.x - p2.x) * (q2.y - q1.y) + (q2.x - p2.x) * (q2.y - q1.y) * (p1.y - p2.y) - q2.y * (q1.x - q2.x) * (p2.y - p1.y);
                var y = tmpRight / tmpLeft;
                return {
                    x: x,
                    y: y
                };
            }
            return false;
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
        Object.defineProperty(Vec2.prototype, "leftNormal", {
            get: function () {
                return new Vec2(this.y, -this.x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "rightNormal", {
            get: function () {
                return new Vec2(-this.y, this.x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "magnitude", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "unitVector", {
            get: function () {
                return new Vec2(this.x / this.magnitude, this.y / this.magnitude);
            },
            enumerable: true,
            configurable: true
        });
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
            Utils.unitVector = function (deg) {
                return new IMAPIC2D.Vec2(Math.cos(Math.PI * deg / 180), Math.sin(Math.PI * deg / 180));
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
            Utils.getCornersRegion = function (points) {
                var min = new IMAPIC2D.Vec2(Infinity, Infinity);
                var max = new IMAPIC2D.Vec2(-Infinity, -Infinity);
                var scope = this;
                points.forEach(function (corner) {
                    min.min(corner);
                    max.max(corner);
                });
                return {
                    min: min,
                    max: max
                };
            };
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
            function InWall(wall, type, scale, dir) {
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
                this.lengthScaled = scale !== undefined ? scale : 1.0;
                this.dir = dir !== undefined ? dir : 1.0;
                this.initSize(type);
                this.computeStart();
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
            }
            InWall.prototype.GetDrawingWidth = function () {
                return this.wall ? this.wall.thickness : IMAPIC2D._DEFINES_.WALL.THINCKNESS;
            };
            InWall.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            InWall.prototype.clone = function () {
                return {
                    wall: this.wall,
                    start: this.start,
                    end: this.end,
                    dir: this.dir,
                    offset: this.offset,
                    lengthScaled: this.lengthScaled,
                    type: this.type
                };
            };
            InWall.prototype.copy = function (inwall) {
                this.wall = inwall.wall;
                this.start = inwall.start.clone();
                this.end = inwall.end.clone();
                this.dir = inwall.dir;
                this.offset = inwall.offset;
                this.lengthScaled = inwall.lengthScaled;
                this.type = inwall.type;
            };
            InWall.prototype.toJson = function () {
                return {
                    id: this.id,
                    wallId: this.wall.id,
                    modelId: 0,
                    offset: this.offset,
                    length: this.length,
                    lengthScaled: this.lengthScaled,
                    dir: this.dir,
                    bottom: this.disToBot,
                    height: this.height,
                    type: this.type
                };
            };
            InWall.prototype.getMatrix = function () {
                var line = this.getLine();
                var scale = this.lengthScaled;
                scale *= this.wall.isCWForRoom ? 1.0 : -1.0;
                var matrixS = new THREE.Matrix4().makeScale(scale * 0.1, 0.1, 0.1);
                var matrix0 = new THREE.Matrix4().makeTranslation(this.length * this.lengthScaled / 2.0, 0, 0);
                var matrixR = new THREE.Matrix4().makeRotationY(Math.PI * 2.0 - line.slope());
                var matrix2 = new THREE.Matrix4().makeTranslation(line.start.x, this.disToBot, line.start.y);
                return matrix2.multiply(matrixR).multiply(matrix0).multiply(matrixS);
            };
            InWall.prototype.to3d = function () {
                var item = IMAPIC2D._DEFINES_.IN_WALL.ITEMS[this.type];
                var _offsetStart = this.start.distanceTo(this.wall.getStartXY());
                return {
                    id: this.id,
                    wallId: this.wall.id,
                    start: this.start.toJson(),
                    end: this.end.toJson(),
                    length: this.length * this.lengthScaled * this.dir,
                    offsetStart_1: _offsetStart + this.wall.offset.offset_1,
                    offsetStart_2: _offsetStart + this.wall.offset.offset_2,
                    bottom: this.disToBot,
                    height: this.height,
                    uuid: item['UUID'],
                    matrix: this.getMatrix()
                };
            };
            InWall.prototype.getLine = function () {
                return new IMAPIC2D.Line(this.start, this.end);
            };
            InWall.prototype.initSize = function (type) {
                var item = IMAPIC2D._DEFINES_.IN_WALL.ITEMS[type];
                this.length = item ? item.WIDTH : 100;
                this.disToBot = item ? item._BOTTOM : 50;
                this.height = item ? item._HEIGHT : 100;
                this.minLength = item.WIDTH_MIN !== undefined ? item.WIDTH_MIN : 50;
                this.maxLength = item.WIDTH_MAX !== undefined ? item.WIDTH_MAX : 100000;
            };
            InWall.prototype.setLength = function (length) {
                this.length = length;
                this.computeStart();
            };
            InWall.prototype.getLength = function () {
                return this.length;
            };
            InWall.prototype.getRawLength = function () {
                return this.length * this.lengthScaled;
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
                var line = this.wall.restrictLine.clone();
                if (this.dir < 0) {
                    line.set(line.end, line.start);
                }
                var scale = line.clone().scale(IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL);
                line.start.add(scale);
                this.start.copy(line.start);
                this.end = line.clone().scale(this.length * this.lengthScaled).add(line.start);
            };
            InWall.prototype.canMove = function () {
                var minDis = this.getRawLength() / 2.0 + IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                var start = this.wall.restrictLine.start;
                var end = this.wall.restrictLine.end;
                var _ptstart = this.wall.getStartXY();
                return Math.abs(this.offset - minDis) > start.distanceTo(_ptstart) && (this.offset + minDis) < end.distanceTo(_ptstart);
            };
            InWall.prototype.compute = function (centerXY) {
                var line = this.wall.getLine();
                var isReverse = line.getSide(centerXY) > 0;
                if (isReverse) {
                    line.set(line.end, line.start);
                }
                var half_len = this.getRawLength() / 2.0;
                var p = line.closestPointOnLine(centerXY);
                var minDis = half_len + IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                if ((p.distanceTo(this.wall.restrictLine.start) > minDis) && (p.distanceTo(this.wall.restrictLine.end) > minDis)) {
                    var scaleVec = line.scale(half_len);
                    this.start.addVectors(p, scaleVec.clone().negate());
                    this.end.addVectors(p, scaleVec);
                    this.offset = p.distanceTo(this.wall.getStartXY());
                    this.dir = isReverse ? -1 : 1;
                }
            };
            InWall.prototype.recompute = function () {
                var line = this.wall.getLine();
                var half_len = this.dir * this.length * this.lengthScaled / 2.0;
                this.start.addVectors(line.scale(this.offset - half_len), line.start);
                this.end.addVectors(line.scale(this.offset + half_len), line.start);
            };
            InWall.prototype.computeOffsetAndLength = function (activePoint, mousePos) {
                var _line = this.wall.restrictLine.clone();
                if (this.dir < 0) {
                    _line.set(_line.end, _line.start);
                }
                var scope = this;
                var isCanMove = function (center, curLength) {
                    var items = scope.wall.onItems;
                    var canMove = true;
                    for (var i = 0; i < items.length; ++i) {
                        var _line = items[i].getLine();
                        var pOffset = _line.start.clone().add(_line.end).divideScalar(2.0);
                        if (items[i] != scope && center.distanceTo(pOffset) < (curLength + _line.length()) / 2.0 + IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL) {
                            canMove = false;
                            break;
                        }
                    }
                    return canMove;
                };
                if (activePoint.equals(this.start)) {
                    var p = new IMAPIC2D.Line(_line.start, this.end).closestPointOnLine(mousePos);
                    var curLength = p.distanceTo(this.end);
                    if (curLength > this.minLength && curLength < this.maxLength && p.distanceTo(_line.start) > IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL) {
                        var center = p.clone().add(this.end).divideScalar(2.0);
                        isCanMove(center, curLength) && this.start.copy(p);
                    }
                }
                else if (activePoint.equals(this.end)) {
                    var p = new IMAPIC2D.Line(this.start, _line.end).closestPointOnLine(mousePos);
                    var curLength = p.distanceTo(this.start);
                    if (curLength > this.minLength && curLength < this.maxLength && p.distanceTo(_line.end) > IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL) {
                        var center = p.clone().add(this.start).divideScalar(2.0);
                        isCanMove(center, curLength) && this.end.copy(p);
                    }
                }
                else {
                    console.error('computeOffsetAndLength:怎么可能！');
                    return;
                }
                var line = this.getLine();
                this.lengthScaled = line.length() / this.length;
                this.offset = line.center().distanceTo(this.wall.getStartXY());
            };
            InWall.prototype.distanceFromPoint = function (point) {
                return this.getLine().distanceToPoint(point);
            };
            InWall.prototype.hoveredPoint = function (mousePos) {
                var distance = this.wall.thickness;
                if (this.start.distanceTo(mousePos) < distance) {
                    return this.start;
                }
                else if (this.end.distanceTo(mousePos) < distance) {
                    return this.end;
                }
                else {
                    return null;
                }
            };
            InWall.prototype.hovered = function (point, tolerence) {
                tolerence = tolerence || 0;
                if (this.distanceFromPoint(point) < tolerence)
                    return true;
                var type = Math.floor(this.type);
                if (type == 0) {
                    return this.hovered_Door_dankai(point);
                }
                else if (type == 1) {
                    return this.hovered_Door_shuangkai(point);
                }
                else if (type == 12) {
                    return this.hovered_Window_piaochuang(point);
                }
                else {
                    return false;
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
            InWall.prototype.hovered_Window_piaochuang = function (point) {
                var line = this.getLine();
                var disVec = line.scale(100 / 2.0);
                var p1 = disVec.clone().add(line.start);
                p1.rotateAround(line.start, Math.PI / 2.0);
                var p2 = disVec.clone().add(line.end);
                p2.rotateAround(line.end, Math.PI / 2.0);
                return IMAPIC2D.Core.Utils.isPointInsidePolygon(point, [line.start, p1, p2, line.end]);
            };
            InWall.prototype.relativeMove = function (dx, dy) {
                this.compute(new IMAPIC2D.Vec2(dx, dy));
            };
            InWall.prototype.updateAttachedWall = function (wall) {
                if (this.wall != wall) {
                    this.wall && IMAPIC2D.Core.Utils.removeValue(this.wall.onItems, this);
                    this.wall = wall;
                    this.wall.onItems.push(this);
                }
            };
            InWall.prototype.updatePositionByOffset = function (wall, startOffset) {
                this.updateAttachedWall(wall);
                this.offset = startOffset + this.getRawLength() / 2.0 + IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                if (!wall.isCWForRoom) {
                    this.dir = -1;
                }
                this.computePositionByOffset();
            };
            InWall.prototype.computePositionByOffset = function () {
                var line = this.wall.getLine();
                this.start = line.scale(this.offset - this.dir * this.getRawLength() / 2.0).add(line.start);
                this.end = line.scale(this.offset + this.dir * this.getRawLength() / 2.0).add(line.start);
            };
            InWall.prototype.inErrorPlace = function () {
                if (!this.wall) {
                    return true;
                }
                var restrictLine = this.wall.restrictLine;
                var center = this.getLine().center();
                var disMin = this.getRawLength() / 2.0 - IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                var isLeft = center.distanceTo(restrictLine.start) < disMin;
                var isRight = center.distanceTo(restrictLine.end) < disMin;
                if (isLeft || isRight) {
                    return true;
                }
                var inwalls = this.wall.onItems;
                var line0 = this.getLine();
                for (var i = 0; i < inwalls.length; i++) {
                    var inwall = inwalls[i];
                    if (inwall == this) {
                        continue;
                    }
                    var line1 = inwall.getLine();
                    if (line0.center().distanceTo(line1.center()) * 2 < (this.getRawLength() + inwall.getRawLength())) {
                        return true;
                    }
                }
                return false;
            };
            return InWall;
        }());
        Items.InWall = InWall;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var RoomRect = (function () {
        function RoomRect(points, size) {
            this.states = [];
            this.innerPoints = [];
            this.minGrids = 1;
            this.maxGrids = 1;
            this.points = points;
            this.size = size !== undefined ? size : IMAPIC2D._DEFINES_.LIGHTS_RECT.MIN_SIZE;
            this.minGrids = Math.ceil(IMAPIC2D._DEFINES_.LIGHTS_RECT.MIN_LENGTH / this.size);
            this.maxGrids = Math.ceil(IMAPIC2D._DEFINES_.LIGHTS_RECT.MAX_LENGTH / this.size);
            this.initStates();
        }
        RoomRect.prototype.isInnerPoint = function (j, i, startPoint) {
            var p = new IMAPIC2D.Vec2(j, i).multiplyScalar(this.size).add(startPoint);
            return IMAPIC2D.Core.Utils.isPointInsidePolygon(p, this.points) ? new IMAPIC2D.Vec2(j, i) : false;
        };
        RoomRect.prototype.initStates = function () {
            var region = IMAPIC2D.Core.Utils.getCornersRegion(this.points);
            var stepX = Math.floor((region.max.x - region.min.x) / this.size);
            var stepY = Math.floor((region.max.y - region.min.y) / this.size);
            this.states = [];
            this.innerPoints = [];
            for (var i = 0; i < stepY; ++i) {
                this.states[i] = [];
                var line = this.states[i];
                for (var j = 0; j < stepX; ++j) {
                    line[j] = this.isInnerPoint(j, i, region.min);
                    line[j] !== false && this.innerPoints.push(line[j]);
                }
            }
            this.region = region;
        };
        RoomRect.prototype.getMaxX = function (x, y) {
            var line = this.states[y];
            var maxIndex = line.length;
            for (var i = x + 1; i < maxIndex; ++i) {
                if (line[i] === false) {
                    return i - 1;
                }
            }
            return maxIndex - 1;
        };
        RoomRect.prototype.getMaxY = function (x, y) {
            var maxIndex = this.states.length;
            for (var i = y + 1; i < maxIndex; ++i) {
                var line = this.states[i];
                if (line[x] === false) {
                    return i - 1;
                }
            }
            return maxIndex - 1;
        };
        RoomRect.prototype.checkSingleMaxRect = function (x, y) {
            var MINSTEP = this.minGrids;
            var yStep = this.getMaxY(x, y) - y - MINSTEP;
            var xStep = this.getMaxX(x, y) - x - MINSTEP;
            if (xStep < 0 || yStep < 0) {
                return false;
            }
            var maxArea = MINSTEP * MINSTEP;
            var maxVec = new IMAPIC2D.Vec2(x, y);
            for (var i = 0; i < yStep; ++i) {
                var yIndex = y + MINSTEP + i;
                var line = this.states[yIndex];
                for (var j = 0; j < xStep; ++j) {
                    var xIndex = x + MINSTEP + j;
                    if (line[xIndex] === false) {
                        break;
                    }
                    var _area = (yIndex - y) * (xIndex - x);
                    if (_area > maxArea) {
                        maxArea = _area;
                        maxVec.set(xIndex, yIndex);
                    }
                }
            }
            return {
                maxArea: maxArea,
                max: maxVec
            };
        };
        RoomRect.prototype.inRect = function (p, min, max) {
            return !(p.x < min.x || p.x > max.x || p.y < min.y || p.y > max.y);
        };
        RoomRect.prototype.index2Point = function (vec) {
            return vec.clone().multiplyScalar(this.size).add(this.region.min);
        };
        RoomRect.prototype.inputIndex2Rect = function (minVec, maxVec, rects) {
            var min = this.index2Point(minVec);
            var max = this.index2Point(maxVec);
            rects.push([min, new IMAPIC2D.Vec2(max.x, min.y), max, new IMAPIC2D.Vec2(min.x, max.y)]);
        };
        RoomRect.prototype.calculateMaxRect = function (rects, maxTimes, spliceMax) {
            if (maxTimes < 1) {
                return;
            }
            var maxArea = 0;
            var maxVec = new IMAPIC2D.Vec2(0, 0);
            var minVec = new IMAPIC2D.Vec2(0, 0);
            var testPoints = this.innerPoints;
            for (var i = 0; i < testPoints.length; ++i) {
                var point = testPoints[i];
                var result = this.checkSingleMaxRect(point.x, point.y);
                if (result !== false && maxArea < result.maxArea) {
                    maxArea = result.maxArea;
                    maxVec.copy(result.max);
                    minVec.copy(point);
                }
            }
            var disVec = maxVec.clone().sub(minVec);
            if (maxArea < this.minGrids * this.minGrids || (disVec.x < this.minGrids) || (disVec.y < this.minGrids)) {
                return;
            }
            if (spliceMax && (disVec.x > this.maxGrids || disVec.y > this.maxGrids)) {
                if (disVec.x > disVec.y) {
                    var max1 = new IMAPIC2D.Vec2(minVec.x, maxVec.y).center(maxVec);
                    var min2 = new IMAPIC2D.Vec2(maxVec.x, minVec.y).center(minVec);
                    this.inputIndex2Rect(minVec, max1, rects);
                    this.inputIndex2Rect(min2, maxVec, rects);
                }
                else {
                    var max1 = new IMAPIC2D.Vec2(maxVec.x, minVec.y).center(maxVec);
                    var min2 = new IMAPIC2D.Vec2(minVec.x, maxVec.y).center(minVec);
                    this.inputIndex2Rect(minVec, max1, rects);
                    this.inputIndex2Rect(min2, maxVec, rects);
                }
            }
            else {
                this.inputIndex2Rect(minVec, maxVec, rects);
            }
            var scope = this;
            this.innerPoints = IMAPIC2D.Core.Utils.removeIf(testPoints, function (point) {
                var isUsed = scope.inRect(point, minVec, maxVec);
                if (isUsed) {
                    var line = scope.states[point.y];
                    line[point.x] = false;
                }
                return isUsed;
            });
            this.calculateMaxRect(rects, --maxTimes, spliceMax);
        };
        RoomRect.prototype.calculateAllRects = function (maxRect, spliceMax) {
            var rects = [];
            spliceMax = spliceMax === false ? false : true;
            this.calculateMaxRect(rects, maxRect, spliceMax);
            return rects;
        };
        RoomRect.prototype.getInfo = function (min, max, arr) {
            var info = {};
            info['center'] = min.center(max).toJson();
            info['width'] = max.x - min.x;
            info['height'] = max.y - min.y;
            arr.push(info);
        };
        RoomRect.prototype.convertRects2CenterAndWH = function (rects) {
            var arr = [];
            for (var i = 0; i < rects.length; ++i) {
                var rect = rects[i];
                var min = rect[0];
                var max = rect[2];
                this.getInfo(min, max, arr);
            }
            return arr;
        };
        return RoomRect;
    }());
    IMAPIC2D.RoomRect = RoomRect;
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var Items;
    (function (Items) {
        var FootLine = (function () {
            function FootLine(mapUrl) {
                this.mapUrl = mapUrl;
                this.callbacks = {
                    move: null,
                    delete: null,
                    action: null
                };
                this.points = [];
                this.minSize = new IMAPIC2D.Vec2();
                this.maxSize = new IMAPIC2D.Vec2();
                this.mapUrl = mapUrl || "";
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
            }
            FootLine.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            FootLine.prototype.toJson = function () {
                return {
                    mapUrl: this.mapUrl,
                };
            };
            FootLine.prototype.to3d = function () {
                return {
                    id: this.mapUrl,
                };
            };
            FootLine.prototype.remove = function () {
                this.callbacks.delete.fire(this);
            };
            FootLine.prototype.hovered = function (point, tolerence) {
                tolerence = tolerence || 0;
                return true;
            };
            FootLine.prototype.checkInRoom = function (pointsRoom) {
                var pnts = this.points;
                for (var i = 0; i < pnts.length; i++) {
                    var element = pnts[i];
                    if (!IMAPIC2D.Core.Utils.isPointInsidePolygon(element, pointsRoom)) {
                        return element;
                    }
                }
                return true;
            };
            return FootLine;
        }());
        Items.FootLine = FootLine;
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
                this.rects = [];
                this.innerPoints = [];
                this.walls = [];
                this.nameStr = "未命名";
                this.footLine = new Items.FootLine();
                this._tempCount = 0;
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
                    cornerIndex: this.getUuid(),
                    size: this.area,
                    center: {
                        x: this.centroid.x,
                        y: this.centroid.y
                    },
                    rects: this.outputRects()
                };
            };
            Room.prototype.to3d = function () {
                var tmpHeight = 0;
                this.getWalls().forEach(function (wall) {
                    tmpHeight = Math.max(tmpHeight, wall.height);
                });
                var truePoints = IMAPIC2D.Core.Utils.map(this.corners, function (corner) {
                    return corner.getPosition();
                });
                var wallIds = IMAPIC2D.Core.Utils.map(this.walls, function (wall) {
                    return wall.id;
                });
                return {
                    id: this.id,
                    height: tmpHeight,
                    center: this.centroid.toJson(),
                    ground: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.innerPoints),
                    rects: this.outputRects(),
                    truePoints: truePoints,
                    walls: wallIds
                };
            };
            Room.prototype.outputRects = function () {
                var roomRect = this.computeRect();
                return roomRect.convertRects2CenterAndWH(this.rects);
            };
            Room.prototype.update = function () {
                this.updateAttachedWalls();
                this.getWalls().forEach(function (wall) {
                    wall.usedByRooms++;
                });
                this.updateEdges();
                this.innerPoints = [];
                this.updateInnerPoint(this.walls[0], this.walls[0].getStart());
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
            Room.prototype.hovered = function (point, tolerence) {
                return IMAPIC2D.Core.Utils.isPointInsidePolygon(point, this.innerPoints);
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
            Room.prototype.pushInnerPoints = function (wall, startCorner, endCorner) {
                var line = wall.isCWForRoom == 0 ? wall.edge1 : wall.edge2;
                var p = wall.getStart() == startCorner ? line.end : line.start;
                this.innerPoints.push(p);
            };
            Room.prototype.updateInnerPoint = function (wall, startCorner) {
                if (this._tempCount++ == this.walls.length) {
                    this._tempCount = 0;
                    return;
                }
                var corner = wall.oppositeCorner(startCorner);
                var wall1 = this.oppositeWall(wall, corner);
                if (wall1 == null) {
                    console.error('计算房间内墙点时，发生错误！');
                    return;
                }
                if (corner.adjacentWalls().length > 2) {
                    this.pushInnerPoints(wall, startCorner, corner);
                    this.innerPoints.push(corner.getPosition());
                    var corner1 = wall1.oppositeCorner(corner);
                    this.pushInnerPoints(wall1, corner1, corner);
                }
                else {
                    this.pushInnerPoints(wall, startCorner, corner);
                }
                this.updateInnerPoint(wall1, corner);
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
                this.area = Math.abs(signedArea * 0.5);
                this.centroid = centroid.divideScalar(3.0 * signedArea);
                if (1 && !IMAPIC2D.Core.Utils.isPointInsidePolygon(this.centroid, this.innerPoints)) {
                    var roomRect = new IMAPIC2D.RoomRect(this.innerPoints);
                    var rects = roomRect.calculateAllRects(1, false);
                    if (rects.length < 1) {
                        return;
                    }
                    var rect = rects[0];
                    var min = rect[0];
                    var max = rect[2];
                    this.centroid = min.center(max);
                }
            };
            Room.prototype.computeRect = function (maxCall) {
                if (maxCall === void 0) { maxCall = IMAPIC2D._DEFINES_.LIGHTS_RECT.MAX_RECTS; }
                var roomRect = new IMAPIC2D.RoomRect(this.innerPoints);
                this.rects = roomRect.calculateAllRects(maxCall);
                return roomRect;
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
            function HalfEdge(wall, start, end, controlPoint) {
                var _this = _super.call(this, start, end) || this;
                _this.wall = wall;
                _this.start = start;
                _this.end = end;
                _this.controlPoint = controlPoint;
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
            function Wall(start, end, id, controlPoint) {
                this.start = start;
                this.end = end;
                this.controlPoint = controlPoint;
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
                this.edge1 = new Items.HalfEdge(this, undefined, undefined, controlPoint);
                this.edge2 = new Items.HalfEdge(this, undefined, undefined, controlPoint);
                this.thickness = IMAPIC2D._DEFINES_.WALL.THINCKNESS;
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
                    cornerIndex: this.getUuid(),
                    controlPoint: this.controlPoint === undefined ? undefined : this.controlPoint.toJson(),
                };
            };
            Wall.prototype.to3d = function () {
                this.offset.offset_1 = this.getEdgeOffsetStart(this.edge1);
                this.offset.offset_2 = this.getEdgeOffsetStart(this.edge2);
                var inwalls = IMAPIC2D.Core.Utils.map(this.onItems, function (item) {
                    return item.to3d();
                });
                return {
                    id: this.id,
                    start: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.outline.startPnts),
                    end: IMAPIC2D.Core.Utils.Vec2ArrayToJson(this.outline.endPnts),
                    usedByRooms: this.usedByRooms,
                    isCW: this.isCWForRoom,
                    height: this.height,
                    width: this.thickness,
                    controlPoint: this.controlPoint === undefined ? undefined : this.controlPoint.toJson(),
                };
            };
            Wall.prototype.setThickness = function (value) {
                this.thickness = value;
                this.recomputeOutlinePoints();
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
                var p1 = this.start.clone().add(d);
                var p2 = this.end.clone().add(d);
                if (this.start.isEnableMoveWall(p1, this) && this.end.isEnableMoveWall(p2, this)) {
                    this.start.updatePosition(p1.x, p1.y);
                    this.end.updatePosition(p2.x, p2.y);
                    return true;
                }
                return false;
            };
            Wall.prototype.remove = function () {
                this.start.detachWall(this);
                this.end.detachWall(this);
                this.callbacks.delete.fire(this);
            };
            Wall.prototype.delete = function () {
                this.remove();
                this.start.recomputeOutlinePoints();
                this.end.recomputeOutlinePoints();
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
                var p = this.controlPoint;
                if (p === undefined) {
                    return;
                }
                this.computeEdgeControlPoint(this.edge1);
                this.computeEdgeControlPoint(this.edge2);
            };
            Wall.prototype.computeEdgeControlPoint = function (edge) {
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
                var offset = 0;
                if (p.equals(this.start)) {
                    offset = edge.closestPointOnLine(this.start).distanceTo(edge.start);
                }
                else {
                    offset = -p.distanceTo(this.start);
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
        var RectStruct = (function () {
            function RectStruct(center, type, slope, width, height, length, id) {
                this.center = center;
                this.type = type;
                this.slope = slope;
                this.width = width;
                this.height = height;
                this.length = length;
                this.id = id;
                this.callbacks = {
                    move: null,
                    delete: null,
                    action: null
                };
                this.points = [];
                this.minSize = new IMAPIC2D.Vec2();
                this.maxSize = new IMAPIC2D.Vec2();
                this.id = id || IMAPIC2D.Core.Utils.guid();
                var param = IMAPIC2D._DEFINES_.CONSTRUCTION[type];
                this.slope = slope === undefined ? 0 : slope;
                this.width = width === undefined ? param.WIDTH : width;
                this.height = height === undefined ? param.HEIGHT : height;
                this.length = length === undefined ? param.LENGTH : length;
                this.minSize.set(param.MIN_LEN, param.MIN_LEN);
                this.maxSize.set(param.MAX_LEN, param.MAX_LEN);
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
                this.compute8points();
            }
            RectStruct.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            RectStruct.prototype.toJson = function () {
                return {
                    id: this.id,
                    type: this.type,
                    width: this.width,
                    height: this.height,
                    length: this.length,
                    center: this.center.toJson(),
                    slope: this.slope
                };
            };
            RectStruct.prototype.to3d = function () {
                return {
                    id: this.id,
                    type: this.type,
                    width: this.width,
                    height: this.height,
                    length: this.length,
                    center: this.center.toJson(),
                    slope: this.slope
                };
            };
            RectStruct.prototype.remove = function () {
                this.callbacks.delete.fire(this);
            };
            RectStruct.prototype.hovered = function (point, tolerence) {
                tolerence = tolerence || 0;
                var halfWH = new IMAPIC2D.Vec2(this.width, this.height).multiplyScalar(0.5);
                var a = this.center.clone().sub(halfWH);
                var b = this.center.clone().add(halfWH);
                var minX = Math.min(a.x, b.x);
                var hovered = point.x > Math.min(a.x, b.x) && point.x < Math.max(a.x, b.x) && point.y > Math.min(a.y, b.y) && point.y < Math.max(a.y, b.y);
                return hovered;
            };
            RectStruct.prototype.compute8points = function () {
                var minx = this.center.x - this.width * 0.5;
                var maxx = this.center.x + this.width * 0.5;
                var miny = this.center.y - this.height * 0.5;
                var maxy = this.center.y + this.height * 0.5;
                var cenx = this.center.x;
                var ceny = this.center.y;
                var points = [];
                points.push(new IMAPIC2D.Vec2(minx, miny));
                points.push(new IMAPIC2D.Vec2(maxx, maxy));
                points.push(new IMAPIC2D.Vec2(maxx, miny));
                points.push(new IMAPIC2D.Vec2(minx, maxy));
                points.push(new IMAPIC2D.Vec2(cenx, miny));
                points.push(new IMAPIC2D.Vec2(cenx, maxy));
                points.push(new IMAPIC2D.Vec2(minx, ceny));
                points.push(new IMAPIC2D.Vec2(maxx, ceny));
                for (var i = 0; i < points.length; i++) {
                    var element = points[i];
                    var line = new IMAPIC2D.Line(this.center, element);
                    var len = line.length();
                    var slope = line.slope() + this.slope;
                    points[i].set(this.center.x + len * Math.cos(slope), this.center.y + len * Math.sin(slope));
                }
                this.points = points;
                return points;
            };
            RectStruct.prototype.hoveredPointIndex = function (mousePos) {
                var points = this.points;
                for (var i = 0; i < points.length; i++) {
                    var p = points[i];
                    if (p.distanceTo(mousePos) < IMAPIC2D._DEFINES_.TOLERANCE.EDGERECT) {
                        return i;
                    }
                }
                return null;
            };
            RectStruct.prototype.computeRotateScale = function () {
                return Math.min(Math.min(window.innerHeight, window.innerWidth) / 7, 150);
            };
            RectStruct.prototype.hoveredRotationBar = function (mousePos) {
                var line = new IMAPIC2D.Line(this.center, mousePos);
                var slope = (line.slope() + Math.PI * 2) % (Math.PI * 2);
                var slope1 = (this.slope + Math.PI * 2) % (Math.PI * 2);
                if (Math.abs(slope - slope1) > Math.PI / 4) {
                    return null;
                }
                var scale = this.computeRotateScale();
                var dis = line.length() / scale;
                if (dis > IMAPIC2D._DEFINES_.CONSTRUCTION.ROTATE_ARROW_IR_RATIO && dis < 1.0) {
                    return true;
                }
                return null;
            };
            RectStruct.prototype.computeSizeByPnts = function (p1, p2) {
                var w = p1.x - p2.x;
                var h = p1.y - p2.y;
                w = Math.abs(w);
                h = Math.abs(h);
                this.width = w;
                this.height = h;
                this.center = p1.center(p2);
            };
            RectStruct.prototype.canMovePoint = function (index, mousePos) {
                switch (index) {
                    case 0:
                        var disVec = this.points[1].clone().sub(mousePos);
                        return disVec.x >= this.minSize.x && disVec.x <= this.maxSize.x && disVec.y >= this.minSize.y && disVec.y <= this.maxSize.y;
                    case 1:
                        var disVec = mousePos.clone().sub(this.points[0]);
                        return disVec.x >= this.minSize.x && disVec.x <= this.maxSize.x && disVec.y >= this.minSize.y && disVec.y <= this.maxSize.y;
                    case 2:
                        var disVec = mousePos.clone().sub(this.points[3]);
                        disVec.y *= -1;
                        return disVec.x >= this.minSize.x && disVec.x <= this.maxSize.x && disVec.y >= this.minSize.y && disVec.y <= this.maxSize.y;
                    case 3:
                        var disVec = this.points[2].clone().sub(mousePos);
                        disVec.y *= -1;
                        return disVec.x >= this.minSize.x && disVec.x <= this.maxSize.x && disVec.y >= this.minSize.y && disVec.y <= this.maxSize.y;
                }
                return false;
            };
            RectStruct.prototype.checkInRoom = function (pointsRoom) {
                var pnts = this.points;
                for (var i = 0; i < pnts.length; i++) {
                    var element = pnts[i];
                    if (!IMAPIC2D.Core.Utils.isPointInsidePolygon(element, pointsRoom)) {
                        return element;
                    }
                }
                return true;
            };
            RectStruct.prototype.recomputeSizeByIndex = function (index, mousePos) {
                if (0 && !this.canMovePoint(index, mousePos)) {
                    return;
                }
                switch (index) {
                    case 0:
                    case 1:
                        this.points[index].copy(mousePos);
                        this.computeSizeByPnts(this.points[0], this.points[1]);
                        break;
                    case 2:
                    case 3:
                        this.points[index].copy(mousePos);
                        this.computeSizeByPnts(this.points[2], this.points[3]);
                        break;
                    case 4:
                    case 5:
                        this.points[index].y = mousePos.y;
                        this.height = this.points[5].y - this.points[4].y;
                        this.center = this.points[5].center(this.points[4]);
                        break;
                    case 6:
                    case 7:
                        this.points[index].x = mousePos.x;
                        this.width = this.points[7].x - this.points[6].x;
                        this.center = this.points[7].center(this.points[6]);
                        break;
                }
                this.compute8points();
            };
            return RectStruct;
        }());
        Items.RectStruct = RectStruct;
    })(Items = IMAPIC2D.Items || (IMAPIC2D.Items = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var UndoRedo;
    (function (UndoRedo) {
        var Command = (function () {
            function Command() {
            }
            Command.prototype.undo = function () { };
            ;
            Command.prototype.redo = function () { };
            ;
            return Command;
        }());
        UndoRedo.Command = Command;
    })(UndoRedo = IMAPIC2D.UndoRedo || (IMAPIC2D.UndoRedo = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var UndoRedo;
    (function (UndoRedo) {
        var Stack = (function () {
            function Stack() {
                this.list = [];
                this.index = 0;
            }
            Stack.getStack = function () {
                if (!Stack.singleStack)
                    Stack.singleStack = new Stack();
                return Stack.singleStack;
            };
            Stack.prototype.exec = function (cmd) {
                this.list[this.index++] = cmd;
            };
            Stack.prototype.undo = function () {
                var state = true;
                if (this.index > 0) {
                    this.list[--this.index].undo();
                }
                else {
                    state = false;
                }
                return state;
            };
            Stack.prototype.redo = function () {
                var state = true;
                if (this.index < this.list.length) {
                    this.list[this.index++].redo();
                }
                else {
                    state = false;
                }
                return state;
            };
            return Stack;
        }());
        UndoRedo.Stack = Stack;
    })(UndoRedo = IMAPIC2D.UndoRedo || (IMAPIC2D.UndoRedo = {}));
})(IMAPIC2D || (IMAPIC2D = {}));
var IMAPIC2D;
(function (IMAPIC2D) {
    var UndoRedo;
    (function (UndoRedo) {
        var SaveCmd = (function (_super) {
            __extends(SaveCmd, _super);
            function SaveCmd(jsonOld, json, fl) {
                var _this = _super.call(this) || this;
                _this.json = json;
                _this.jsonOld = jsonOld;
                _this.floorplan = fl;
                return _this;
            }
            SaveCmd.prototype.undo = function () {
                this.floorplan.loadFloorplan(this.jsonOld, true);
            };
            SaveCmd.prototype.redo = function () {
                this.floorplan.loadFloorplan(this.json, true);
            };
            return SaveCmd;
        }(UndoRedo.Command));
        UndoRedo.SaveCmd = SaveCmd;
    })(UndoRedo = IMAPIC2D.UndoRedo || (IMAPIC2D.UndoRedo = {}));
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
                this.rectStructList = [];
                this._GlobalWallThinckness = IMAPIC2D._DEFINES_.WALL.THINCKNESS;
                this.callbacks = {
                    new_corner: null,
                    new_wall: null,
                    redraw: null,
                    updated_rooms: null,
                    roomLoaded: null
                };
                this.count = 0;
                this.savedOld = null;
                for (var item in this.callbacks) {
                    this.callbacks[item] = $.Callbacks();
                }
                this.Stack = new IMAPIC2D.UndoRedo.Stack();
            }
            Floorplan.prototype.execSaveCommand = function () {
                var savedNow = this.saveFloorplan();
                this.Stack.exec(new IMAPIC2D.UndoRedo.SaveCmd(this.savedOld, savedNow, this));
                this.savedOld = savedNow;
                console.log('execSaveCommand', ++this.count);
            };
            Floorplan.prototype.fireOnType = function (type, callback) {
                this.callbacks[type].add(callback);
            };
            Floorplan.prototype.updateRoom = function () {
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
                this.clearItem(this.rectStructList);
                this.roomList = [];
            };
            Floorplan.prototype.newCorner = function (x, y, id) {
                var corner = new Items.Corner(x, y, this, id);
                this.cornerList.push(corner);
                var self = this;
                corner.fireOnType('delete', function () {
                    IMAPIC2D.Core.Utils.removeValue(self.cornerList, corner);
                });
                return corner;
            };
            Floorplan.prototype.getCorners = function () {
                return this.cornerList;
            };
            Floorplan.prototype.getCenterOrSize = function (isCenter) {
                var region = IMAPIC2D.Core.Utils.getCornersRegion(this.cornerList);
                if (region.min.x == Infinity || region.max.x == -Infinity || region.min.y == Infinity || region.max.y == -Infinity) {
                    return new IMAPIC2D.Vec2();
                }
                return isCenter ? region.min.clone().add(region.max).divideScalar(2.0) : region.max.clone().sub(region.min);
            };
            Floorplan.prototype.newWall = function (start, end, id, controlPoint) {
                var wall = new Items.Wall(start, end, id, controlPoint);
                this.wallList.push(wall);
                var self = this;
                wall.fireOnType('delete', function () {
                    IMAPIC2D.Core.Utils.removeValue(self.wallList, wall);
                });
                return wall;
            };
            Floorplan.prototype.getWalls = function () {
                return this.wallList;
            };
            Floorplan.prototype.newRectStruct = function (type, center, slope, w, h, l, id) {
                center = center === undefined ? new IMAPIC2D.Vec2(Math.random() * 100, Math.random() * 100) : center;
                var rectStruct = new Items.RectStruct(center, type, slope, w, h, l, id);
                this.rectStructList.push(rectStruct);
                var self = this;
                rectStruct.fireOnType('delete', function () {
                    IMAPIC2D.Core.Utils.removeValue(self.rectStructList, rectStruct);
                });
            };
            Floorplan.prototype.getRectStructs = function () {
                return this.rectStructList === undefined ? [] : this.rectStructList;
            };
            Floorplan.prototype.newDroppedCeiling = function () {
            };
            Floorplan.prototype.checkPlaceableOfCurrentPositionForInwallItem = function (wall, curItem, position) {
                var items = wall.onItems;
                var curInWallLen = curItem.getRawLength();
                var start = wall.restrictLine.start.clone();
                var end = wall.restrictLine.end.clone();
                var p = wall.restrictLine.closestPointOnLine(position);
                var _minDis = IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                var minWallDis = _minDis + curInWallLen / 2.0;
                var offset = p.distanceTo(wall.getStartXY());
                if (p.distanceTo(start) < minWallDis) {
                    offset = start.distanceTo(wall.getStartXY()) + minWallDis;
                }
                else if (p.distanceTo(end) < minWallDis) {
                    offset = start.distanceTo(wall.getStartXY(false)) - minWallDis;
                }
                this.bindRemoveInWall(curItem, wall);
                if (p.distanceTo(position) * 2.0 > wall.thickness) {
                    curItem.dir = wall.getLine().getSide(position) > 0 ? -1 : 1;
                }
                curItem.updatePositionByOffset(wall, offset - curInWallLen / 2.0);
                return true;
            };
            Floorplan.prototype.findInitialSuitablePositionForInwallItem = function (wall, curItem) {
                var items = wall.onItems;
                var curInWallLen = curItem.getRawLength();
                var start = wall.restrictLine.start.clone();
                var wallLength = wall.restrictLine.length();
                var minDistance = start.distanceTo(wall.getStartXY());
                if (items.length == 0) {
                    if (wallLength - curInWallLen < IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL * 2.0) {
                        return false;
                    }
                    curItem.updatePositionByOffset(wall, minDistance);
                    return true;
                }
                items.sort(function (a, b) {
                    return a.offset - b.offset;
                });
                for (var i = 0; i < items.length; ++i) {
                    var item = items[i];
                    var minLength = item.getRawLength() / 2.0 + curInWallLen + 2.0 * IMAPIC2D._DEFINES_.IN_WALL.MIN_DISTANCE_TO_WALL;
                    var enableLeft = item.offset - minLength > minDistance;
                    if (enableLeft) {
                        curItem.updatePositionByOffset(wall, minDistance);
                        return true;
                    }
                    var maxLength = i + 1 == items.length ? wallLength : items[i + 1].offset - items[i + 1].getRawLength() / 2;
                    var enableRight = item.offset + minLength < maxLength;
                    minDistance = item.offset + item.getRawLength() / 2.0;
                    if (enableRight) {
                        curItem.updatePositionByOffset(wall, minDistance);
                        return true;
                    }
                    if (i + 1 < items.length) {
                        minDistance = items[i + 1].offset + items[i + 1].getRawLength() / 2.0;
                    }
                }
                return false;
            };
            Floorplan.prototype.newInWall = function (type, wall, scale, dir, usedForLoad) {
                if (this.wallList.length < 1) {
                    alert('请【先绘制墙】，再添加墙上物体！');
                    return false;
                }
                var _wall = wall !== undefined ? wall : this.wallList[0];
                var item = new Items.InWall(_wall, type, scale, dir);
                if (wall === undefined) {
                    var i = 0;
                    var isPlaceable = false;
                    while (i < this.wallList.length) {
                        if (this.findInitialSuitablePositionForInwallItem(this.wallList[i++], item)) {
                            isPlaceable = true;
                            break;
                        }
                    }
                    if (!isPlaceable) {
                        console.warn('已经找不到墙来放置门窗了!');
                        return false;
                    }
                    wall = this.wallList[--i];
                }
                else {
                }
                wall.onItems.push(item);
                this.inWallList.push(item);
                this.bindRemoveInWall(item, wall);
                if (usedForLoad === undefined) {
                    this.execSaveCommand();
                }
                return item;
            };
            Floorplan.prototype.bindRemoveInWall = function (item, wall) {
                var self = this;
                item.fireOnType('delete', function () {
                    IMAPIC2D.Core.Utils.removeValue(self.inWallList, item);
                    IMAPIC2D.Core.Utils.removeValue(wall.onItems, item);
                });
            };
            Floorplan.prototype.GetMovingPlacedWall = function (item, p) {
                for (var i = 0; i < this.wallList.length; i++) {
                    var wall = this.wallList[i];
                    if (wall.getLine().distanceToPoint(p) < IMAPIC2D._DEFINES_.TOLERANCE.INWALL_NEAR) {
                        return wall;
                    }
                }
                return null;
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
                    rooms: [],
                    rectStructs: []
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
                this.getRooms().forEach(function (room) {
                    floorplan.rooms.push(room.toJson());
                });
                this.getRectStructs().forEach(function (rect) {
                    floorplan.rectStructs.push(rect.toJson());
                });
                return floorplan;
            };
            Floorplan.prototype.loadFloorplan = function (floorplan, forUndoRedo) {
                var _this = this;
                if (!floorplan || !floorplan['corners']) {
                    return;
                }
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
                        var controlPoint = wallJSON.controlPoint !== undefined ? new IMAPIC2D.Vec2().fromJson(wallJSON.controlPoint) : undefined;
                        var wall = _this.newWall(corner1, corner2, wallJSON.id, controlPoint);
                        wall.setThickness(wallJSON.thickness);
                        walls.push(wall);
                    }
                    else {
                        console.warn('some wall corner error load!');
                    }
                });
                floorplan['inWalls'].forEach(function (inwallJSON) {
                    var wall = null;
                    for (var i = 0; i < walls.length; i++) {
                        if (walls[i].id == inwallJSON['wallId']) {
                            wall = walls[i];
                            break;
                        }
                    }
                    var inWall = _this.newInWall(inwallJSON['type'], wall, inwallJSON['lengthScaled'], inwallJSON['dir'], true);
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
                floorplan['rectStructs'] && floorplan['rectStructs'].forEach(function (rect) {
                    var center = new IMAPIC2D.Vec2(rect["center"].x, rect["center"].y);
                    var rectStruct = _this.newRectStruct(rect["type"], center, rect["slope"], rect["width"], rect["height"], rect["length"], rect["id"]);
                });
                if (forUndoRedo) {
                    this.savedOld = floorplan;
                }
            };
            Floorplan.prototype.loadSerialized = function (json) {
                var data = JSON.parse(json);
                this.loadFloorplan(data.floorplan, true);
            };
            Floorplan.prototype.exportSerialized = function () {
                var room = {
                    floorplan: this.saveFloorplan()
                };
                return JSON.stringify(room);
            };
            Floorplan.prototype.loadSVGFile = function (url) {
            };
            Floorplan.prototype.to3d = function () {
                var floorplan = {
                    walls: [],
                    inWalls: [],
                    rooms: [],
                    rectStructs: []
                };
                this.getRooms().forEach(function (room) {
                    floorplan.rooms.push(room.to3d());
                });
                this.getWalls().forEach(function (wall) {
                    floorplan.walls.push(wall.to3d());
                });
                this.getInWall().forEach(function (inWall) {
                    floorplan.inWalls.push(inWall.to3d());
                });
                this.getRectStructs().forEach(function (rectStruct) {
                    floorplan.rectStructs.push(rectStruct.to3d());
                });
                return floorplan;
            };
            Floorplan.prototype.convertTo3d = function () {
                return JSON.stringify(this.to3d());
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
                    move: null,
                    delete: null,
                    action: null
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
                this.callbacks.delete.fire(this);
            };
            Corner.prototype.removeConnected = function () {
                var self = this;
                this.adjacentWalls().forEach(function (wall) {
                    var corner = wall.oppositeCorner(self);
                    wall.remove();
                    corner.recomputeOutlinePoints();
                });
                this.remove();
            };
            Corner.prototype.checkWallIntersectWall = function (wall0, wall1) {
                var start0 = wall0.getStartXY();
                var end0 = wall0.getStartXY(false);
                var start1 = wall1.getStartXY();
                var end1 = wall1.getStartXY(false);
                function between(p, min, max) {
                    var tmp = Math.max(max, min);
                    (tmp != max) && (min = max);
                    return p > min && p < tmp;
                }
                var bet = between(start1.y, start0.y, end0.y) || between(end1.y, start0.y, end0.y) || between(start1.x, start0.x, end0.x) || between(end1.x, start0.x, end0.x);
                var samey = Math.max(start0.y, end0.y) == Math.max(start1.y, end1.y) && Math.min(start0.y, end0.y) == Math.min(start1.y, end1.y);
                var samex = Math.max(start0.x, end0.x) == Math.max(start1.x, end1.x) && Math.min(start0.x, end0.x) == Math.min(start1.x, end1.x);
                return bet || samex || samey;
            };
            Corner.prototype.checkCornerCanMove = function (newPnt, curWall) {
                var walls = this.adjacentWalls();
                if (!walls || walls.length < 2) {
                    return true;
                }
                return true;
                var minSlope = Math.PI / 18.0;
                var _walls = this.sortWalls(walls);
                for (var i = 0, len = _walls.length; i < len; i++) {
                    var wall0 = _walls[i];
                    var wall1 = i + 1 == len ? _walls[0] : _walls[i + 1];
                    var slope = Math.abs(wall0.slope - wall1.slope);
                    if (slope < minSlope) {
                        console.log('111111111111');
                        return false;
                    }
                }
                if (!curWall || curWall === undefined) {
                    return true;
                }
                var wallsNeedTest = this.floorplan.getWalls();
                var checkWalls = IMAPIC2D.Core.Utils.removeIf(wallsNeedTest, function (element) {
                    var needRemove = element == curWall || (element.slope != curWall.slope && Math.abs(curWall.slope - element.slope) != Math.PI);
                    return needRemove;
                });
                var MinDistanceOfWall = IMAPIC2D._DEFINES_.TOLERANCE.CORNER + IMAPIC2D._DEFINES_.WALL.THINCKNESS;
                var isLR = curWall.slope == Math.PI / 2.0 || curWall.slope == Math.PI * 1.5;
                for (var i = 0; i < checkWalls.length; ++i) {
                    var _wall = checkWalls[i];
                    var _line = _wall.getLine();
                    if (_line.distanceToPoint(this, true) < _line.distanceToPoint(newPnt, true)) {
                        continue;
                    }
                    var _corner = _line.start;
                    if (isLR) {
                        if (Math.abs(this.x - _corner.x) < MinDistanceOfWall) {
                            return false;
                        }
                    }
                    else {
                        if (Math.abs(this.y - _corner.y) < MinDistanceOfWall) {
                            return false;
                        }
                    }
                }
                var slopeD = new IMAPIC2D.Line(this, newPnt).slope();
                IMAPIC2D.Core.Utils.removeValue(walls, curWall);
                for (var i = 0; i < walls.length; ++i) {
                    var wall = walls[i];
                    var isBeingShorter = Math.abs(wall.slope - slopeD) < Math.PI / 2.0;
                    if (!isBeingShorter) {
                        continue;
                    }
                    var items = wall.onItems;
                    for (var j = 0; j < items.length; ++j) {
                        if (!items[j].canMove()) {
                            return false;
                        }
                    }
                }
                return true;
            };
            Corner.prototype.isEnableMove = function (newX, newY) {
                var corners = this.adjacentCorners();
                corners.push(this);
                var p = new IMAPIC2D.Vec2(newX, newY);
                for (var i = 0; i < corners.length; i++) {
                    if (!corners[i].checkCornerCanMove(p)) {
                        return false;
                    }
                }
                return true;
            };
            Corner.prototype.isEnableMoveWall = function (newPoint, wall) {
                return this.checkCornerCanMove(newPoint, wall);
            };
            Corner.prototype.move = function (newX, newY) {
                if (this.isEnableMove(newX, newY)) {
                    this.updatePosition(newX, newY);
                    return true;
                }
                return false;
            };
            Corner.prototype.updatePosition = function (x, y) {
                this.x = x;
                this.y = y;
                this.recomputeOutlinePoints();
                this.adjacentCorners().forEach(function (corner) {
                    corner.recomputeOutlinePoints();
                });
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
            Corner.prototype.pushPointIntoTwoWalls = function (wall0, wall1, restrictAngle) {
                if (restrictAngle === void 0) { restrictAngle = true; }
                var angleA = wall0.slope;
                var angleB = wall1.slope;
                var theta = angleB - angleA;
                var _tmp = Math.abs(theta);
                if (restrictAngle && Math.abs(_tmp - Math.PI) < Math.PI / 90.0) {
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
                var pnts = this.computeOuterPoint(p0, p1, angleA, angleB);
                var pt0 = pnts[0];
                var pt1 = pnts[1];
                this.classifyEdgeCorner(wall0, true, pt0, pt1);
                this.classifyEdgeCorner(wall1, false, pt0, pt1);
                return true;
            };
            Corner.prototype.computeOuterPoint = function (p0, p1, angleA, angleB) {
                var theta = angleB - angleA;
                var p1_cot0 = (p0 + p1 * Math.cos(theta)) / Math.sin(theta);
                var sinA = Math.sin(angleA);
                var cosA = Math.cos(angleA);
                var disX = p1_cot0 * cosA - p1 * sinA;
                var disY = p1_cot0 * sinA + p1 * cosA;
                var disVec = new IMAPIC2D.Vec2(disX, disY);
                var center = this.getPosition();
                var pt0 = center.clone().sub(disVec);
                var pt1 = center.clone().add(disVec);
                return [pt0, pt1];
            };
            Corner.prototype.recomputeOutlinePoints = function () {
                var _this = this;
                var walls = this.adjacentWalls();
                if (!walls || walls.length < 1)
                    return;
                if (walls.length == 1) {
                    var wall = walls[0];
                    var line = wall.controlPoint !== undefined ? new IMAPIC2D.Line(this.getPosition(), wall.controlPoint) : wall.getLine();
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
                    inWallPoint: null,
                    camera: null,
                    sector: null,
                    rectStruct: null,
                    rectStruct_PntIndex: null,
                    rectStruct_RotateArrow: null
                };
                this.selected = {
                    corner: null,
                    room: null,
                    wall: null,
                    inWall: null,
                    rectStruct: null
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
                this.pixel2CmRatio = 1400;
                this.needUpdateRooms = false;
                this.needUpdateItems = false;
                this.convertToClient2 = function (x, y) {
                    var pos = new IMAPIC2D.Vec2(x, y);
                    return pos.multiplyScalar(this.pixelsPerCm).sub(this.origin).add2(this.canvasJQ.offset().left, this.canvasJQ.offset().top);
                };
                this.distanceStart = 1.0;
                this.inWallOld = null;
                this.dragOffset = new IMAPIC2D.Vec2();
                this.rectStruct_RotateArrow_preSlope = 0;
                this.canvasJQ = $("#" + engine.canvasId);
                this.canvasDOM = engine.canvasElement;
                this.wallLengthSettingJQ = $("#" + engine.wallLengthSettingId);
                this.wallLengthSetting2JQ = $("#" + engine.wallLengthSettingId2);
                var scope = this;
                this.canvasDOM.addEventListener("mousedown", function (event) { scope.mousedown(event); });
                document.addEventListener('mousemove', function (event) { scope.mousemove(event); }, false);
                this.canvasDOM.addEventListener("mouseup", function (event) { scope.mouseup(event); });
                this.canvasDOM.addEventListener("mouseleave", function () { scope.mouseleave(); });
                $(document).keyup(function (event) { scope.keyup(event); });
                this.canvasDOM.addEventListener('touchstart', function (event) { scope.touchstart(event); }, false);
                this.canvasDOM.addEventListener('touchend', function (event) { scope.touchend(event); }, false);
                this.canvasDOM.addEventListener('touchmove', function (event) { scope.touchmove(event); }, false);
                this.canvasDOM.addEventListener('wheel', function (event) { scope.mousewheel(event); }, false);
                if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.floorplan.newCamera(this.target.x, this.target.y);
                }
                $(window).resize(function () { scope.handleWindowResize(); });
            }
            Handle.prototype.setInputValue = function (input) {
                var lengthNum = (input.val() + "").replace(/[^0-9]/g, '');
                input.val(lengthNum);
                var len = parseInt(lengthNum) / 10.0;
                if (!this.clampWallLength(len)) {
                    return 0;
                }
                return len;
            };
            Handle.prototype.clampWallLength = function (len) {
                if (len < IMAPIC2D._DEFINES_.WALL.LENGTH_MIN) {
                    alert('墙长度不得低于' + IMAPIC2D._DEFINES_.WALL.LENGTH_MIN + '厘米');
                }
                else if (len > IMAPIC2D._DEFINES_.WALL.LENGTH_MAX) {
                    alert('墙长度不得高于' + IMAPIC2D._DEFINES_.WALL.LENGTH_MAX + '厘米');
                }
                else {
                    return true;
                }
                return false;
            };
            Handle.prototype.keyup = function (event) {
                var key = event.keyCode;
                if (key == 27) {
                    this.escapeKey();
                }
                var input = this.wallLengthSettingJQ;
                var input2 = this.wallLengthSetting2JQ;
                var activeId = document.activeElement.id;
                if (input.css('display') == 'none' || this.lastCorner == null) {
                    return;
                }
                if (key == 9) {
                    if (input2.attr('id') === activeId) {
                        input2.focus();
                    }
                    else {
                        input.focus();
                    }
                }
                if (key == 13 || key == 16777296) {
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                        if (input.attr('id') === activeId) {
                            var len = this.setInputValue(input);
                            if (!len) {
                                return;
                            }
                            var wallThinckness = this.engine.toggle.showWallInnerLine ? IMAPIC2D._DEFINES_.WALL.THINCKNESS : 0;
                            var p = new IMAPIC2D.Line(this.lastCorner, this.target).scale(len + wallThinckness).add(this.lastCorner);
                            this.target.copy(p);
                            this.event_create_corner();
                            input.hide();
                        }
                    }
                    else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW_ROOM) {
                        if (input.attr('id') !== activeId && input2.attr('id') !== activeId) {
                            return;
                        }
                        var t = new IMAPIC2D.Vec2(this.target.x, this.lastCorner.y);
                        var wallThinckness = this.engine.toggle.showWallInnerLine ? IMAPIC2D._DEFINES_.WALL.THINCKNESS : 0;
                        if (input.attr('id') === activeId) {
                            var len = this.setInputValue(input) + wallThinckness;
                            if (!len) {
                                return;
                            }
                            this.target.x = new IMAPIC2D.Line(this.lastCorner, t).scale(len).add(this.lastCorner).x;
                            input2.focus();
                            this.update();
                        }
                        else if (input2.attr('id') === activeId) {
                            var len = this.setInputValue(input2) + wallThinckness;
                            if (!len) {
                                return;
                            }
                            this.target.y = new IMAPIC2D.Line(t, this.target).scale(len).add(t).y;
                            this.event_create_rectRoom();
                        }
                    }
                }
            };
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
                this.pixelsPerCm = Math.min(this.canvasDOM.height, this.canvasDOM.width) / this.pixel2CmRatio;
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
            Handle.prototype.computeCenter = function () {
                var centerXY = new IMAPIC2D.Vec2(this.canvasJQ.innerWidth(), this.canvasJQ.innerHeight()).divideScalar(2.0);
                return this.floorplan.getCenterOrSize(true).multiplyScalar(this.pixelsPerCm).sub(centerXY);
            };
            Handle.prototype.resetOrigin = function () {
                var centerXY = new IMAPIC2D.Vec2(this.canvasJQ.innerWidth(), this.canvasJQ.innerHeight()).divideScalar(2.0);
                this.origin.subVectors(this.floorplan.getCenterOrSize(true).multiplyScalar(this.pixelsPerCm), centerXY);
            };
            Handle.prototype.setMode = function (mode) {
                this.lastCorner = null;
                this.wallLengthSetting2JQ.hide();
                this.wallLengthSettingJQ.hide();
                this.mode = mode;
                this.modeResetCallbacks.fire(mode);
                this.updateTarget();
            };
            Handle.prototype.noActive = function () {
                for (var key in this.active) {
                    if (this.active[key] != null) {
                        return false;
                    }
                }
                return true;
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
                if (this.noActive()) {
                    mouseCursorStr = 'default';
                }
                else {
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE) {
                        mouseCursorStr = 'Pointer';
                    }
                    else if (this.active.wall) {
                        mouseCursorStr = this.SetCursorStyleBySlope(this.active.wall.getLine().slope());
                    }
                    else if (this.active.rectStruct_PntIndex && this.selected.rectStruct) {
                        var rect = this.selected.rectStruct;
                        var slope = new IMAPIC2D.Line(rect.points[this.active.rectStruct_PntIndex], rect.center).slope();
                        mouseCursorStr = this.SetCursorStyleBySlope((slope + Math.PI / 2.0) % (Math.PI * 2));
                    }
                    else {
                        mouseCursorStr = 'move';
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
                if (this.mouseDown && this.noActive()) {
                    this.event_move_canvas();
                    return;
                }
                if (this.mouseDown && IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.event_move_camera();
                }
                else {
                    if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                        !this.wallLengthSettingJQ.is(':focus') && this.wallLengthSettingJQ.focus();
                        this.updateTarget();
                    }
                    else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW_ROOM) {
                        this.updateRoomRect();
                    }
                    else {
                        if (this.mouseDown) {
                            this.event_move_item();
                            this.update();
                        }
                        else {
                            this.event_getActive();
                        }
                    }
                }
                var scope = this;
                setTimeout(function () {
                    !scope.noActive() && scope.update();
                }, 50);
            };
            Handle.prototype.computeTwoFingerDistance = function (event) {
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            };
            Handle.prototype.touchstart = function (event) {
                event.preventDefault();
                this.mouseDown = true;
                switch (event.touches.length) {
                    case 1:
                        this.handleTouchStart(event.touches[0].pageX, event.touches[0].pageY);
                        break;
                    case 2:
                        this.distanceStart = this.computeTwoFingerDistance(event);
                        break;
                }
            };
            Handle.prototype.touchend = function (event) {
                event.preventDefault();
                this.mouseDown = false;
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
                if (!this.mouseDown)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handleTouchMove(event.touches[0].pageX, event.touches[0].pageY);
                        break;
                    case 2:
                        var distance = this.computeTwoFingerDistance(event);
                        if (!distance)
                            return;
                        this.handleScale(this.distanceStart - distance);
                        this.update();
                        this.distanceStart = distance;
                        break;
                }
            };
            Handle.prototype.handleScale = function (value) {
                this.pixelsPerCm += value < 0 ? 0.01 : -0.01;
                this.pixelsPerCm = Math.max(0.2, Math.min(1.0, this.pixelsPerCm));
                this.update();
            };
            Handle.prototype.getCurFloorplanSaved = function () {
                return this.floorplan.saveFloorplan();
            };
            Handle.prototype.event_delete = function () {
                var needUpdateRoom = true;
                if (this.active.corner) {
                    var curCorner = this.active.corner;
                    curCorner.removeConnected();
                }
                else if (this.active.wall) {
                    this.active.wall.delete();
                    this.active.wall = null;
                }
                else if (this.active.inWall) {
                    this.active.inWall.remove();
                    this.active.inWall = null;
                }
                else if (this.active.rectStruct) {
                    this.active.rectStruct.remove();
                    this.active.rectStruct = null;
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
                if (needUpdateRoom) {
                    this.floorplan.updateRoom();
                    this.floorplan.saveFloorplan();
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
                this.update();
            };
            Handle.prototype.event_move_item = function () {
                if (this.selected.inWall && this.active.inWallPoint) {
                    this.selected.inWall.computeOffsetAndLength(this.active.inWallPoint, this.curMouse);
                    this.needUpdateItems = true;
                    return;
                }
                if (this.active.rectStruct_RotateArrow) {
                    var rect = this.selected.rectStruct;
                    var slope = new IMAPIC2D.Line(rect.center, this.curMouse).slope() - new IMAPIC2D.Line(rect.center, this.convertFromClient(this.posMouseDown)).slope() + this.rectStruct_RotateArrow_preSlope;
                    var tmp = (slope * 180 / Math.PI + 360) % 360;
                    for (var i_1 = 0; i_1 < 9; i_1++) {
                        if (tmp < 45 * i_1 + 5 && tmp > (45 * i_1 - 5)) {
                            slope = Math.PI * i_1 / 4;
                            break;
                        }
                    }
                    rect.slope = slope;
                    rect.compute8points();
                    this.needUpdateItems = true;
                    return;
                }
                if (this.active.rectStruct_PntIndex !== null) {
                    this.selected.rectStruct.recomputeSizeByIndex(this.active.rectStruct_PntIndex, this.curMouse);
                    this.needUpdateItems = true;
                    return;
                }
                if (this.active.corner) {
                    var activeCorner = this.active.corner;
                    this.isAlignCorner(this.curMouse);
                    if (activeCorner.move(this.curMouse.x, this.curMouse.y)) {
                        activeCorner.adjacentWalls().forEach(function (wall) {
                            wall.onItems.forEach(function (item) {
                                item.recompute();
                            });
                        });
                        this.needUpdateRooms = true;
                    }
                }
                else if (this.active.wall) {
                    if (this.selected.wall && this.active.wall != this.selected.wall) {
                        this.selected.wall = null;
                    }
                    var activeWall = this.active.wall;
                    var relativePos = this.rawMouse.clone().sub(this.lastMouse).divideScalar(this.pixelsPerCm);
                    if (this.engine.toggle.moveWallStraight) {
                        var slope = activeWall.getLine().slope();
                        var isLeftRight = (slope > Math.PI * 0.25 && slope < Math.PI * 0.75) || (slope > Math.PI * 1.25 && slope < Math.PI * 1.75);
                        if (isLeftRight) {
                            relativePos.y = 0;
                        }
                        else {
                            relativePos.x = 0;
                        }
                    }
                    if (activeWall.relativeMove(relativePos)) {
                        var wallsStarts = activeWall.getStart().adjacentWalls();
                        var wallsEnds = activeWall.getEnd().adjacentWalls();
                        var walls = wallsStarts.concat(wallsEnds);
                        var hasComputeOnce = false;
                        for (var i = 0; i < walls.length; ++i) {
                            if (!hasComputeOnce && walls[i] == activeWall) {
                                hasComputeOnce = true;
                                continue;
                            }
                            walls[i].onItems.forEach(function (item) {
                                item.recompute();
                            });
                        }
                        this.needUpdateRooms = true;
                    }
                    this.lastMouse.copy(this.rawMouse);
                }
                else if (this.active.inWall) {
                    if (this.selected.inWall && this.active.inWall != this.selected.inWall) {
                        this.selected.inWall = null;
                    }
                    var curInWall = this.active.inWall;
                    var wall = this.floorplan.GetMovingPlacedWall(curInWall, this.curMouse);
                    if (!wall) {
                        var half_len = curInWall.dir * curInWall.getRawLength() / 2.0;
                        curInWall.start.set(this.curMouse.x - half_len, this.curMouse.y);
                        curInWall.end.set(this.curMouse.x + half_len, this.curMouse.y);
                        curInWall.wall && IMAPIC2D.Core.Utils.removeValue(curInWall.wall.onItems, curInWall);
                        curInWall.wall = null;
                    }
                    else {
                        if (this.floorplan.checkPlaceableOfCurrentPositionForInwallItem(wall, curInWall, this.curMouse)) {
                            this.needUpdateItems = true;
                        }
                    }
                    return;
                    var finalIndex = -1;
                    var walls = this.floorplan.getWalls();
                    for (var i = 0; i < walls.length; i++) {
                        var wall = walls[i];
                        if (curInWall.wall != wall && wall.distanceFromPoint(this.curMouse) < IMAPIC2D._DEFINES_.TOLERANCE.INWALL_ATTACH) {
                            finalIndex = i;
                            break;
                        }
                    }
                    var _wall = finalIndex > -1 ? walls[finalIndex] : curInWall.wall;
                    if (this.floorplan.checkPlaceableOfCurrentPositionForInwallItem(_wall, curInWall, this.curMouse)) {
                        this.needUpdateItems = true;
                    }
                }
                else if (this.active.rectStruct) {
                    var rect = this.active.rectStruct;
                    var centerOld = rect.center;
                    rect.center = this.curMouse.clone().add(this.dragOffset);
                    rect.compute8points();
                    this.needUpdateItems = true;
                    return;
                    var moveLine = new IMAPIC2D.Line(centerOld, rect.center);
                    var rooms = this.floorplan.getRooms();
                    var points = rooms[0].innerPoints;
                    var IntersectPoint = false;
                    for (var i_2 = 0; i_2 < points.length; i_2++) {
                        var q0 = points[i_2];
                        var q1 = i_2 + 1 == points.length ? points[0] : points[i_2 + 1];
                        var wallLine = new IMAPIC2D.Line(q0, q1);
                        IntersectPoint = wallLine.LineSegementsIntersect(moveLine);
                        if (IntersectPoint !== false) {
                            rect.center = centerOld;
                            rect.compute8points();
                            break;
                        }
                    }
                }
            };
            Handle.prototype.event_getActive = function () {
                for (var key in this.active) {
                    this.active[key] = null;
                }
                if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.active.camera = this.getCameraActiveItem(this.floorplan.getCamera(), this.active.camera);
                    this.active.sector = this.getSectorActiveItem(this.floorplan.getCamera(), this.active.sector);
                }
                else {
                    var noHoveredOfSelectedItem = true;
                    if (this.selected.inWall) {
                        var item = this.selected.inWall;
                        this.active.inWallPoint = item.hoveredPoint(this.curMouse);
                        noHoveredOfSelectedItem = this.active.inWallPoint === null;
                    }
                    else if (this.selected.rectStruct) {
                        var rect = this.selected.rectStruct;
                        this.active.rectStruct_RotateArrow = rect.hoveredRotationBar(this.curMouse);
                        noHoveredOfSelectedItem = this.active.rectStruct_RotateArrow == null;
                        if (noHoveredOfSelectedItem) {
                            var index = rect.hoveredPointIndex(this.curMouse);
                            this.active.rectStruct_PntIndex = index;
                            noHoveredOfSelectedItem = index === null;
                        }
                        else {
                            this.needUpdate = true;
                        }
                    }
                    if (noHoveredOfSelectedItem) {
                        this.active.corner = this.getActiveItem(this.floorplan.getCorners(), this.active.corner);
                        if (this.active.corner == null) {
                            this.active.inWall = this.getActiveItem(this.floorplan.getInWall(), this.active.inWall);
                            if (this.active.inWall == null) {
                                this.active.wall = this.getActiveItem(this.floorplan.getWalls(), this.active.wall);
                                if (this.active.wall == null) {
                                    if (this.selected.rectStruct) {
                                        this.active.rectStruct = this.getActiveItem(this.floorplan.getRectStructs(), this.active.rectStruct);
                                        if (this.active.rectStruct != this.selected.rectStruct) {
                                            this.active.rectStruct = null;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            Handle.prototype.spliceSelectedWall = function () {
                var wall = this.selected.wall;
                var center = wall.getLine().center();
                var corner = this.floorplan.newCorner(center.x, center.y);
                var needUpdateRoom = corner.mergeWithIntersected(IMAPIC2D._DEFINES_.TOLERANCE.CORNER);
                if (needUpdateRoom) {
                    this.floorplan.updateRoom();
                    this.floorplan.execSaveCommand();
                }
                this.active.wall = null;
                this.selected.wall = null;
                this.update();
            };
            Handle.prototype.deleteSelectedWall = function () {
                this.selected.wall.delete();
                this.selected.wall = null;
                this.active.wall = null;
                this.floorplan.updateRoom();
                this.floorplan.execSaveCommand();
                this.update();
            };
            Handle.prototype.event_create_corner = function () {
                var corner = this.floorplan.newCorner(this.target.x, this.target.y);
                var needUpdateRoom = corner.mergeWithIntersected(IMAPIC2D._DEFINES_.TOLERANCE.CORNER);
                if (this.lastCorner !== null && this.lastCorner.distanceTo(corner) > IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER) {
                    this.floorplan.newWall(this.lastCorner, corner);
                    this.wallLengthSettingJQ.hide();
                    needUpdateRoom = true;
                }
                if (needUpdateRoom) {
                    this.floorplan.updateRoom();
                    this.floorplan.execSaveCommand();
                }
                this.lastCorner = corner;
                this.update();
            };
            Handle.prototype.event_create_rectRoom = function () {
                var corner = this.floorplan.newCorner(this.target.x, this.target.y);
                if (this.lastCorner == null) {
                    this.lastCorner = corner;
                    return;
                }
                var pList = [];
                pList.push(this.lastCorner);
                pList.push(this.floorplan.newCorner(this.lastCorner.x, corner.y));
                pList.push(corner);
                pList.push(this.floorplan.newCorner(corner.x, this.lastCorner.y));
                for (var i = 0; i < 4; i++) {
                    var p = pList[i];
                    var p1 = i == 3 ? this.lastCorner : pList[i + 1];
                    this.floorplan.newWall(p, p1);
                }
                this.floorplan.updateRoom();
                this.floorplan.execSaveCommand();
                this.lastCorner = null;
                this.update();
                this.wallLengthSetting2JQ.hide();
                this.wallLengthSettingJQ.hide();
            };
            Handle.prototype.handleSelected_room = function (x, y) {
            };
            Handle.prototype.event_select = function (x, y) {
                for (var key in this.selected) {
                    this.selected[key] = null;
                }
                this.selected.corner = this.getActiveItem(this.floorplan.getCorners(), this.selected.corner);
                if (this.selected.corner == null) {
                    this.selected.inWall = this.getActiveItem(this.floorplan.getInWall(), this.selected.inWall);
                    if (this.selected.inWall == null) {
                        this.selected.wall = this.getActiveItem(this.floorplan.getWalls(), this.selected.wall);
                        if (this.selected.wall == null) {
                            this.selected.rectStruct = this.getActiveItem(this.floorplan.getRectStructs(), this.selected.rectStruct);
                            if (this.selected.rectStruct == null) {
                                this.selected.room = this.getActiveItem(this.floorplan.getRooms(), this.selected.room);
                            }
                        }
                    }
                }
                if (this.needUpdate) {
                    this.update();
                }
            };
            Handle.prototype.handleMouseDown = function (x, y) {
                this.mouseDown = true;
                this.mouseMoved = false;
                this.posMouseDown.set(x, y);
                this.lastMouse.copy(this.rawMouse);
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DELETE) {
                    if (this.event_delete()) {
                    }
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                    if (this.active.rectStruct) {
                        var rect = this.active.rectStruct;
                        this.dragOffset.set(rect.center.x - this.curMouse.x, rect.center.y - this.curMouse.y);
                    }
                    else if (this.active.rectStruct_RotateArrow) {
                        console.log('show circle');
                        this.rectStruct_RotateArrow_preSlope = this.selected.rectStruct.slope;
                    }
                    else if (this.active.inWall) {
                        var inwall = this.active.inWall;
                        var line = inwall.getLine();
                        var p = line.closestPointOnLine(this.rawMouse, true);
                        this.dragOffset.x = p.distanceTo(line.center());
                        this.inWallOld = inwall.clone();
                    }
                }
                this.update();
            };
            Handle.prototype.handleMouseUp = function (x, y) {
                this.mouseDown = false;
                this.mouseMoved = false;
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                    this.event_create_corner();
                    return;
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW_ROOM) {
                    this.event_create_rectRoom();
                    return;
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                    var inwall = this.active.inWall;
                    if (inwall) {
                        if (inwall.inErrorPlace()) {
                            inwall.updateAttachedWall(this.inWallOld.wall);
                            inwall.copy(this.inWallOld);
                            this.update();
                        }
                    }
                }
                var posMouseUp = new IMAPIC2D.Vec2(x, y);
                if (posMouseUp.equals(this.posMouseDown)) {
                    this.event_select(x, y);
                    return;
                }
                if (this.needUpdateRooms) {
                    this.floorplan.getRooms().forEach(function (room) {
                        room.update();
                    });
                }
                if (this.needUpdateRooms || this.needUpdateItems) {
                    this.floorplan.execSaveCommand();
                    this.needUpdateRooms = false;
                    this.needUpdateItems = false;
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
                if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW || this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW_ROOM) {
                }
                else if (this.noActive()) {
                    this.origin.add(this.lastMouse).sub(this.rawMouse);
                    this.lastMouse.copy(this.rawMouse);
                }
                else if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                    this.event_move_camera();
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                    this.event_move_item();
                    this.update();
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
                        this.setMode(IMAPIC2D._DEFINES_.EVENTS.MOVE);
                    }
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                }
                else if (this.mode == IMAPIC2D._DEFINES_.EVENTS.MOVE) {
                    this.event_getActive();
                    if (this.active.inWall) {
                        var inwall = this.active.inWall;
                        var line = inwall.getLine();
                        var p = line.closestPointOnLine(this.rawMouse, true);
                        this.dragOffset.x = p.distanceTo(line.center());
                        this.inWallOld = inwall.clone();
                    }
                }
                this.lastMouse.set(x, y);
                this.update();
            };
            Handle.prototype.isAlignCorner = function (point) {
                var dis = new IMAPIC2D.Vec2(Infinity, Infinity);
                this.alignCorners.snap1 = null;
                this.alignCorners.snap2 = null;
                var snapped = {
                    x: false,
                    y: false
                };
                var curPos = this.curMouse;
                if (this.engine.toggle.snapTarget) {
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
                }
                point.copy(curPos);
                return snapped.x && snapped.y;
            };
            Handle.prototype.updateTarget = function () {
                var isAlign = this.isAlignCorner(this.target);
                if (!isAlign && this.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW && this.lastCorner) {
                    if (this.engine.toggle.drawStraight) {
                        var p = this.curMouse.clone();
                        if (Math.abs(p.x - this.lastCorner.x) < Math.abs(p.y - this.lastCorner.y)) {
                            p.x = this.lastCorner.x;
                        }
                        else {
                            p.y = this.lastCorner.y;
                        }
                        this.target.copy(p);
                    }
                    else {
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
                }
                this.update();
            };
            Handle.prototype.updateRoomRect = function () {
                this.target.copy(this.curMouse);
                var scope = this;
                if (!this.wallLengthSettingJQ.is(':focus') && !this.wallLengthSetting2JQ.is(':focus')) {
                    this.wallLengthSettingJQ.focus();
                }
                if (this.wallLengthSettingJQ.is(':focus')) {
                    setTimeout(function () { scope.wallLengthSettingJQ.select(); }, 50);
                }
                else if (this.wallLengthSetting2JQ.is(':focus')) {
                    this.wallLengthSetting2JQ.select();
                    setTimeout(function () { scope.wallLengthSetting2JQ.select(); }, 50);
                }
                else {
                }
                this.update();
            };
            Handle.prototype.getActiveItem = function (items, curItem) {
                if (!items || items.length < 1) {
                    return null;
                }
                if ((!this.engine.toggle.moveCornerEnable) && (items[0] instanceof IMAPIC2D.Items.Corner)) {
                    return null;
                }
                var hover = this.floorplan.hoverOnItem(this.curMouse, items);
                if (hover != curItem) {
                    this.needUpdate = true;
                    return hover;
                }
                this.needUpdate = false;
                return curItem;
            };
            Handle.prototype.get1ActiveItem = function (items, curItem) {
                if (!items || items.length < 1) {
                    curItem = null;
                }
                if ((items[0] instanceof IMAPIC2D.Items.Corner) && (!this.engine.toggle.moveCornerEnable)) {
                    curItem = null;
                }
                var hover = this.floorplan.hoverOnItem(this.curMouse, items);
                if (hover != curItem) {
                    this.needUpdate = true;
                    curItem = hover;
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
            Handle.prototype.SetCursorStyleBySlope = function (angle) {
                var quatPI = Math.PI / 8.0;
                angle = angle > Math.PI ? angle - Math.PI : angle;
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
                return vec.add(this.origin).divideScalar(this.pixelsPerCm);
            };
            Handle.prototype.convertNum = function (v) {
                return this.pixelsPerCm * v;
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
                    this.context.fillStyle = "#000000";
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
            this.toggle = {
                isPC: true,
                snapTarget: true,
                showCenter: true,
                showBackgroundGrid: true,
                showRoomName: false,
                showRoomArea: true,
                changeRoomName: false,
                moveWallStraight: false,
                moveCornerEnable: true,
                showTextMeter: false,
                showRoomBackgroundImage: false,
                showLightRects: false,
                showWallInnerLine: true,
                drawStraight: false
            };
            this.canvasId = options.canvasId;
            this.wallSettingId = options.wallSettingDivId;
            this.wallLengthSettingId = options.wallLengthSettingDivId;
            this.wallLengthSettingId2 = options.wallLengthSettingDivId2;
            this.canvasElement = document.getElementById(options.canvasId);
            this.context = this.canvasElement.getContext('2d');
            var canvas = this.canvasElement;
            var width = canvas.width, height = canvas.height;
            if (window.devicePixelRatio) {
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.height = height * window.devicePixelRatio;
                canvas.width = width * window.devicePixelRatio;
                this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
            this.drawBasic = new IMAPIC2D.Core.Draw(this.context);
            this.setRoomBackground();
            this.floorplan = new IMAPIC2D.Items.Floorplan();
            this.handle = new IMAPIC2D.EventHandle.Handle(this, this.floorplan);
            this.handle.handleWindowResize();
            console.log('VERSION:', IMAPIC2D._DEFINES_.VERSION);
            return this;
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
        Engine.prototype.setRoomBackground = function () {
            this.roomFillStyle = IMAPIC2D._DEFINES_.ROOM.COLOR;
            var scope = this;
            if (this.toggle.showRoomBackgroundImage) {
                var img = new Image();
                var doDraw = function (image) {
                    scope.roomFillStyle = scope.context.createPattern(image, 'repeat');
                };
                img.onload = function () {
                    doDraw(img);
                };
                img.src = IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.ROOM;
            }
        };
        Engine.prototype.drawBackgroundHuxing = function () {
            var scope = this;
            var img = new Image();
            img.onload = function () {
                scope.roomFillStyle = scope.context.createPattern(img, 'repeat');
            };
            img.src = IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.ROOM;
        };
        Engine.prototype.draw = function () {
            var _this = this;
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.toggle.showBackgroundGrid && this.drawGrid(this.handle.origin);
            this.floorplan.getRooms().forEach(function (room) {
                _this.drawRoom(room);
            });
            if (this.toggle.showCenter) {
                this.drawCenter(this.handle.origin);
            }
            this.drawWalls(this.floorplan.getWalls());
            if (IMAPIC2D._DEFINES_.CAMERA.VISIBLE) {
                this.drawCamera(this.floorplan.getCamera());
            }
            this.drawCorners(this.floorplan.getCorners());
            this.floorplan.getInWall().forEach(function (inWallItem) {
                _this.drawInWallItem(inWallItem);
            });
            if (this.handle.selected.inWall) {
                this.drawWallAndInWallLines([this.handle.selected.inWall.wall]);
            }
            else if (this.handle.active.inWall) {
                this.drawWallAndInWallLines([this.handle.active.inWall.wall]);
            }
            else {
                this.drawWallAndInWallLines(this.floorplan.getWalls(), false);
            }
            this.floorplan.getRectStructs().forEach(function (rect) {
                _this.drawRectStruct(rect);
            });
            if (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW) {
                this.drawTarget(this.handle.target);
            }
            else if (this.handle.mode == IMAPIC2D._DEFINES_.EVENTS.DRAW_ROOM) {
                this.drawRectRoom(this.handle.target);
            }
            if (this.toggle.showLightRects) {
                this.floorplan.getRooms().forEach(function (room) {
                    _this.drawRect(room);
                });
            }
        };
        Engine.prototype.drawRectStruct = function (rect) {
            var hover = (rect === this.handle.selected.rectStruct) ? 2 : ((rect === this.handle.active.rectStruct) ? 1 : 0);
            var color = this.getColorByState(hover, IMAPIC2D._DEFINES_.CONSTRUCTION);
            var pnts = [];
            pnts.push(rect.points[0]);
            pnts.push(rect.points[2]);
            pnts.push(rect.points[1]);
            pnts.push(rect.points[3]);
            this.drawPixelPolygonStrip(pnts, false, color, 2);
            this.drawPixelPolygonStrip(pnts, true, IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_FILL);
            if (hover !== 2) {
                return;
            }
            var p = this.handle.convert(rect.center);
            var scale = rect.computeRotateScale();
            var isHoverRotate = this.handle.active.rectStruct_RotateArrow;
            var iR = IMAPIC2D._DEFINES_.CONSTRUCTION.ROTATE_ARROW_IR_RATIO * scale;
            var oR = IMAPIC2D._DEFINES_.CONSTRUCTION.ROTATE_ARROW_OR_RATIO * scale;
            if (this.handle.mouseDown && isHoverRotate) {
                this.drawRectStruct_RotateCircle(iR, oR, p.x, p.y);
                this.drawRectStruct_RotateGeometryRotate(iR, oR, p.x, p.y, rect.slope, isHoverRotate);
            }
            if (!this.handle.mouseDown) {
                this.drawRectStruct_Points(rect);
                this.drawRectStruct_RotateGeometry(iR, oR, p.x, p.y, rect.slope, isHoverRotate);
            }
        };
        Engine.prototype.computeRectByPoint = function (p, halfLen) {
            p = this.handle.convert(p);
            var r = new IMAPIC2D.Vec2(halfLen, halfLen);
            var t0 = p.clone().sub(r);
            return t0;
        };
        Engine.prototype.drawRectStruct_RotateGeometryRotate = function (iR, oR, startX, startY, slope, hover) {
            var a = Math.PI / 4.0;
            var angleStart = slope - a;
            var angleEnd = slope + a;
            var AL = (iR + oR) * 0.5;
            this.context.strokeStyle = IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_ROTATE_ROTATE;
            this.context.lineWidth = (oR - iR);
            this.context.beginPath();
            this.context.arc(startX, startY, AL, angleStart, angleEnd, false);
            this.context.stroke();
        };
        Engine.prototype.drawRectStruct_RotateGeometry = function (iR, oR, startX, startY, slope, hover) {
            var arLen = 0.07 * oR;
            var arAng = Math.PI / 20.0;
            var a = Math.PI / 4.0;
            var angleStart = slope - a;
            var angleEnd = slope + a;
            var Ssa = Math.cos(angleStart);
            var Sca = Math.sin(angleStart);
            var Esa = Math.cos(angleEnd);
            var Eca = Math.sin(angleEnd);
            var Asa = Math.cos(angleStart - arAng);
            var Aca = Math.sin(angleStart - arAng);
            var AL = (iR + oR) * 0.5;
            var Bsa = Math.cos(angleEnd + arAng);
            var Bca = Math.sin(angleEnd + arAng);
            this.context.fillStyle = IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_ROTATE_ARROW;
            this.context.strokeStyle = IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_ROTATE_ARROW_HOVER;
            this.context.beginPath();
            this.context.moveTo(startX + iR * Ssa, startY + iR * Sca);
            this.context.lineTo(startX + (iR - arLen) * Ssa, startY + (iR - arLen) * Sca);
            this.context.lineTo(startX + AL * Asa, startY + AL * Aca);
            this.context.lineTo(startX + (oR + arLen) * Ssa, startY + (oR + arLen) * Sca);
            this.context.lineTo(startX + oR * Ssa, startY + oR * Sca);
            this.context.arc(startX, startY, oR, angleStart, angleEnd, false);
            this.context.lineTo(startX + (oR + arLen) * Esa, startY + (oR + arLen) * Eca);
            this.context.lineTo(startX + AL * Bsa, startY + AL * Bca);
            this.context.lineTo(startX + (iR - arLen) * Esa, startY + (iR - arLen) * Eca);
            this.context.lineTo(startX + iR * Esa, startY + iR * Eca);
            this.context.arc(startX, startY, iR, angleEnd, angleStart, true);
            this.context.closePath();
            this.context.fill();
            if (hover) {
                this.context.lineWidth = 2;
                this.context.stroke();
            }
        };
        Engine.prototype.drawRectStruct_RotateCircle = function (iR, oR, startX, startY) {
            var AL = (iR + oR) * 0.5;
            this.context.strokeStyle = IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_ROTATE_CIRCLE;
            this.context.lineWidth = (oR - iR);
            this.context.beginPath();
            this.context.arc(startX, startY, AL, 0, Math.PI * 2);
            this.context.closePath();
            this.context.stroke();
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 2;
            this.context.beginPath();
            for (var i = 0; i < 8; i++) {
                var angle = Math.PI / 4 * i;
                var cs = Math.cos(angle);
                var si = Math.sin(angle);
                this.context.moveTo(startX + iR * cs, startY + iR * si);
                this.context.lineTo(startX + oR * cs, startY + oR * si);
            }
            this.context.stroke();
        };
        Engine.prototype.drawRectStruct_Points = function (rect) {
            var points = rect.points;
            this.context.strokeStyle = IMAPIC2D._DEFINES_.CONSTRUCTION.COLOR_EDGERECT;
            this.context.lineWidth = 1;
            var rectLen = this.handle.convertNum(IMAPIC2D._DEFINES_.CONSTRUCTION.EDGERECT_LEN);
            var halfLen = rectLen * 0.5;
            var halfLen2 = rectLen * 0.4;
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                var startPoint = this.computeRectByPoint(p, halfLen);
                this.context.beginPath();
                var len = i > 3 ? halfLen2 * 2 : halfLen * 2;
                this.context.rect(startPoint.x, startPoint.y, len, len);
                this.context.stroke();
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
        Engine.prototype.drawRect = function (room) {
            var points = room.rects;
            for (var i = 0; i < points.length; ++i) {
                var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
                this.drawPixelPolygonStrip(points[i], false, color);
            }
        };
        Engine.prototype.drawRoom = function (room) {
            this.drawPixelPolygonStrip(room.corners, true, this.roomFillStyle);
            this.drawRoomLabel(room.centroid, room.area, room.nameStr);
        };
        Engine.prototype.drawRoomLabel = function (pos, areas, name) {
            this.context.font = "normal 14px Arial";
            this.context.fillStyle = "#000000";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 4;
            var centerPoint = this.handle.convert(pos.x, pos.y);
            if (this.toggle.showRoomName) {
                this.context.strokeText(name, centerPoint.x, centerPoint.y - 15);
                this.context.fillText(name, centerPoint.x, centerPoint.y - 15);
            }
            if (this.toggle.showRoomArea) {
                var str = Math.round(areas * 0.01) / 100 + "m²";
                this.context.strokeText(str, centerPoint.x, centerPoint.y);
                this.context.fillText(str, centerPoint.x, centerPoint.y);
            }
        };
        Engine.prototype.drawAlignLines = function (targetPos) {
            var align_item = IMAPIC2D._DEFINES_.ALIGN_LINE;
            var snap1 = this.handle.alignCorners.snap1;
            if (snap1 !== null) {
                this.drawBasic.drawDashLine(this.handle.convert(snap1), targetPos, align_item.WIDTH, align_item.COLOR);
            }
            var snap2 = this.handle.alignCorners.snap2;
            if (snap2 !== null) {
                this.drawBasic.drawDashLine(this.handle.convert(snap2), targetPos, align_item.WIDTH, align_item.COLOR);
            }
        };
        Engine.prototype.drawTarget = function (target) {
            var targetPos = this.handle.convert(target);
            this.drawAlignLines(targetPos);
            var target_item = IMAPIC2D._DEFINES_.TARGET;
            this.drawBasic.drawCircle(targetPos, target_item.RADIUS, target_item.COLOR, false, target_item.WIDTH);
            var lastNode = this.handle.lastCorner;
            if (lastNode !== null && lastNode.distanceTo(target) > IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER) {
                var lastPos = this.handle.convert(lastNode);
                this.drawBasic.drawLines([new IMAPIC2D.Line(lastPos, targetPos)], target_item.WIDTH, target_item.COLOR);
                var lineArrays = [];
                var fontLines = [];
                this.getHelpLineAndLabel(new IMAPIC2D.Line(lastNode, target), lineArrays, fontLines, IMAPIC2D._DEFINES_.WALL.THINCKNESS);
                this.drawPixelLines(lineArrays, IMAPIC2D._DEFINES_.HELP_LINE.WIDTH, IMAPIC2D._DEFINES_.HELP_LINE.COLOR);
                fontLines[0] && this.drawWallLengthLabels_Input(fontLines[0]);
                var corners = lastNode.adjacentCorners();
                var corner0 = null;
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
        Engine.prototype.drawRectRoom = function (target) {
            var p3 = this.handle.convert(target);
            var target_item = IMAPIC2D._DEFINES_.TARGET;
            this.drawBasic.drawCircle(p3, target_item.RADIUS, target_item.COLOR, false, target_item.WIDTH);
            if (this.handle.lastCorner == null) {
                return;
            }
            var p1 = this.handle.convert(this.handle.lastCorner);
            if (p1.distanceTo(p3) > IMAPIC2D._DEFINES_.TOLERANCE.DISTANCE_HOVER) {
                var halfThinckness = 12;
                this.context.beginPath();
                this.context.lineWidth = halfThinckness * 2.0 * this.handle.pixelsPerCm;
                this.context.strokeStyle = IMAPIC2D._DEFINES_.RECT_ROOM.COLOR;
                this.context.rect(p1.x, p1.y, p3.x - p1.x, p3.y - p1.y);
                this.context.stroke();
                this.context.closePath();
                var helpLineArrays = [];
                var fontLinesArrays = [];
                var t0 = this.handle.lastCorner.clone();
                var t3 = target.clone();
                var p2 = new IMAPIC2D.Vec2(target.x, this.handle.lastCorner.y);
                if (this.toggle.showWallInnerLine) {
                    var tmpX = t3.x > t0.x ? 1.0 : -1.0;
                    t0.x += tmpX * halfThinckness;
                    t3.x -= tmpX * halfThinckness;
                    var tmpY = t3.y > t0.y ? 1.0 : -1.0;
                    t3.y -= tmpY * halfThinckness;
                    t0.y += tmpY * halfThinckness;
                    p2.set(t3.x, t0.y);
                }
                var L1 = new IMAPIC2D.Line(t0, p2);
                var L2 = new IMAPIC2D.Line(p2, t3);
                this.getHelpLineAndLabel(L1, helpLineArrays, fontLinesArrays, halfThinckness * 2.0);
                this.getHelpLineAndLabel(L2, helpLineArrays, fontLinesArrays, halfThinckness * 2.0);
                this.drawPixelLines(helpLineArrays, IMAPIC2D._DEFINES_.HELP_LINE.WIDTH, IMAPIC2D._DEFINES_.HELP_LINE.COLOR);
                this.drawWallLengthLabels_RectRoom(L1, L2);
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
                if (this.handle.mouseDown) {
                    this.drawAlignLines(pixelPos);
                }
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
        Engine.prototype.getErrorColor = function (item) {
            return item.inErrorPlace() ? IMAPIC2D._DEFINES_.COLOR.DELETE : IMAPIC2D._DEFINES_.IN_WALL.COLOR;
        };
        Engine.prototype.drawSelectedIcon = function (pt0, dir) {
            var pt1 = pt0.clone().add(dir);
            var p1 = pt1.clone().rotateAround(pt0, -Math.PI / 2.0);
            var p4 = pt1.clone().rotateAround(pt0, Math.PI / 2.0);
            var p2 = pt0.clone().rotateAround(pt1, Math.PI / 2.0);
            var p3 = pt0.clone().rotateAround(pt1, -Math.PI / 2.0);
            this.drawPixelPolygonStrip([p1, p2, p3, p4], true, IMAPIC2D._DEFINES_.IN_WALL.COLOR);
            var q0 = pt0.clone().add(dir.clone().multiplyScalar(0.7));
            var q1 = pt0.clone().rotateAround(q0, Math.PI / 4.0);
            var q2 = pt0.clone().rotateAround(q0, -Math.PI / 4.0);
            this.drawPixelPolygonStrip([q1, q0, q2], false, IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE, 2);
        };
        Engine.prototype.drawScaleCorner = function (item) {
            var radius = item.GetDrawingWidth() / 2.0 + 1.5 / this.handle.pixelsPerCm;
            var line = item.getLine();
            var disVec = line.scale(radius);
            this.drawSelectedIcon(line.start, disVec.clone().negate());
            this.drawSelectedIcon(line.start, disVec);
            this.drawSelectedIcon(line.end, disVec.clone().negate());
            this.drawSelectedIcon(line.end, disVec);
        };
        Engine.prototype.drawInWallItem = function (item) {
            var hover = (item === this.handle.selected.inWall) ? 2 : ((item === this.handle.active.inWall) ? 1 : 0);
            var type = item.getType();
            var color = hover && item.inErrorPlace() ? IMAPIC2D._DEFINES_.COLOR.DELETE : this.getColorByState(hover, IMAPIC2D._DEFINES_.IN_WALL);
            var _type = Math.floor(type);
            switch (_type) {
                case 0:
                case 4:
                case 5:
                    this.drawDoorSingle(item, hover, color);
                    break;
                case 1:
                case 3:
                    this.drawDoorDouble(item, hover, color);
                    break;
                case 2:
                    this.drawDoorSliding(item, hover, color);
                    break;
                case 10:
                    this.drawWindowNormal(item, hover, color);
                    break;
                case 11:
                    this.drawWindowFrench(item, hover, color);
                    break;
                case 12:
                    this.drawWindowBay(item, hover, color);
                    break;
                case 20:
                    this.drawDoorHole(item, hover, color);
                    break;
                default:
                    console.error('不支持的绘制类型：' + type);
                    break;
            }
            if (hover == 2) {
                this.drawScaleCorner(item);
            }
        };
        Engine.prototype.drawInWallBaseLine = function (line, width, hover, color) {
            var disVec = line.scale(width / 2.0);
            var t1 = line.start.clone().add(disVec);
            var p1 = t1.clone().rotateAround(line.start, Math.PI / 2.0);
            var p2 = t1.clone().rotateAround(line.start, -Math.PI / 2.0);
            var t2 = line.end.clone().sub(disVec);
            var p3 = t2.clone().rotateAround(line.end, Math.PI / 2.0);
            var p4 = t2.clone().rotateAround(line.end, -Math.PI / 2.0);
            var pntArr = [p1, p2, p3, p4];
            this.drawPixelPolygonStrip(pntArr, true, IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE);
            var width = hover ? 2.5 : 1.0;
            this.drawPixelPolygonStrip(pntArr, false, color, width);
        };
        Engine.prototype.drawDoorSingle = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            var center = this.handle.convert(line.start);
            var slope = line.slope();
            var radius = line.length() * this.handle.pixelsPerCm;
            this.context.fillStyle = 'rgba(230, 230, 230, 0.7)';
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, slope, slope + Math.PI / 2.0, false);
            this.context.fill();
            var disVec = line.scale(width * 0.5);
            var p = line.end.clone().rotateAround(line.start, Math.PI / 2.0);
            var p1 = p.clone().add(disVec);
            var p2 = line.start.clone().add(disVec);
            this.drawPixelPolygonStrip([line.start, p, line.end], true, this.context.fillStyle);
            this.drawInWallBaseLine(line, width, hover, color);
            this.drawPixelPolygonStrip([line.start, p, p1, p2], false, color, 1.5);
        };
        Engine.prototype.drawDoorDouble = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
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
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE);
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
        Engine.prototype.drawDoorSliding = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            this.drawInWallBaseLine(line, width, hover, color);
            var lineArray = [];
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
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
            var width = 1;
            this.drawPixelLines(lineArray, width, color);
        };
        Engine.prototype.drawDoorHole = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE);
            var disVec = line.scale(width / 2.0);
            var line1 = line.start.rotatedLine(disVec, Math.PI / 2.0);
            var line2 = line.end.rotatedLine(disVec, Math.PI / 2.0);
            var line3 = new IMAPIC2D.Line(line1.start, line2.start);
            var line4 = new IMAPIC2D.Line(line1.end, line2.end);
            this.drawPixelLines([line1, line2, line3, line4], 1, color);
        };
        Engine.prototype.computeTmpInnerWindow = function (line, width, len1, len2, color) {
            var scope = this;
            var lines = [];
            var halfVec = line.scale(width * 0.5);
            var addLine = function (len, isStart) {
                var disVec = line.scale(len);
                var p0 = disVec.clone().add(line.start);
                var t0 = p0.clone().sub(halfVec);
                var p1 = t0.clone().rotateAround(p0, Math.PI / 2.0);
                var p2 = t0.clone().rotateAround(p0, -Math.PI / 2.0);
                var _line = new IMAPIC2D.Line(p1, p2);
                lines.push(_line);
                var vec0 = _line.scale(width * 0.33);
                var lineArr = [];
                if (isStart) {
                    var k1 = p1.clone().add(vec0);
                    var k2 = p2.clone().sub(vec0);
                    var k3 = k1.clone().sub(disVec);
                    var k4 = k2.clone().sub(disVec);
                    lineArr.push(new IMAPIC2D.Line(k1, k3));
                    lineArr.push(new IMAPIC2D.Line(k2, k4));
                }
                else {
                    var vecEnd = line.scale(line.length() - len);
                    var k1 = p1.clone().add(vec0);
                    var k2 = p2.clone().sub(vec0);
                    var k3 = k1.clone().add(vecEnd);
                    var k4 = k2.clone().add(vecEnd);
                    lineArr.push(new IMAPIC2D.Line(k1, k3));
                    lineArr.push(new IMAPIC2D.Line(k2, k4));
                }
                scope.drawPixelLines(lineArr, 1, color);
            };
            addLine(len1, true);
            addLine(len2, false);
            return lines;
        };
        Engine.prototype.drawWindowNormal = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            this.drawInWallBaseLine(line, width, hover, color);
            var lineWidth = hover ? 2 : 1;
            var lines = this.computeTmpInnerWindow(line, width, line.length() * 0.6, line.length() * 0.6 + 8, color);
            this.drawPixelLines(lines, lineWidth, color);
        };
        Engine.prototype.drawWindowFrench = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            this.drawInWallBaseLine(line, width, hover, color);
            var lines = this.computeTmpInnerWindow(line, width, line.length() * 0.5 - 4, line.length() * 0.5 + 4, color);
            var lineWidth = hover ? 2 : 1;
            this.drawPixelLines(lines, lineWidth, color);
        };
        Engine.prototype.drawWindowBay = function (item, hover, color) {
            var line = item.getLine();
            var width = item.GetDrawingWidth();
            var _H = 40, _D = 12;
            var disVec = line.scale(_H);
            var p1 = disVec.clone().add(line.start);
            p1.rotateAround(line.start, Math.PI / 2.0);
            var p2 = disVec.clone().add(line.end);
            p2.rotateAround(line.end, Math.PI / 2.0);
            var disVec2 = line.scale(_H + _D);
            var disVec4 = line.scale(_H - _D);
            var disVec3 = line.scale(_D);
            var q1 = line.start.clone().add(disVec3);
            var t1 = q1.clone().add(disVec4);
            var q2 = t1.rotateAround(q1, Math.PI / 2.0);
            var q4 = line.end.clone().sub(disVec3);
            var t2 = q4.clone().add(disVec4);
            var q3 = t2.rotateAround(q4, Math.PI / 2.0);
            this.drawPixelPolygonStrip([line.start, p1, p2, line.end], true, IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE);
            var color0 = IMAPIC2D._DEFINES_.IN_WALL.COLOR_BASE;
            this.drawPixelLines([line], width * this.handle.pixelsPerCm, color0);
            var lineWidth = hover ? 2 : 1;
            this.drawPixelPolygonStrip([p1, line.start, q1, q2, q3, q4, line.end, p2], false, color, lineWidth);
        };
        Engine.prototype.drawBezierLine = function (line, p) {
            var p0 = this.handle.convert(line.start);
            var p1 = this.handle.convert(line.end);
            p = this.handle.convert(p);
            this.context.beginPath();
            this.context.moveTo(p0.x, p0.y);
            this.context.quadraticCurveTo(p.x, p.y, p1.x, p1.y);
            this.context.stroke();
        };
        Engine.prototype.drawBezier1 = function (wall, p, o) {
            var pnts = wall.outline;
            this.context.strokeStyle = "#ff0000";
            var line1 = new IMAPIC2D.Line(pnts.startPnts[0], pnts.endPnts[pnts.endPnts.length - 1]);
            var p1 = line1.center().add(p).sub(o);
            var line2 = new IMAPIC2D.Line(pnts.endPnts[0], pnts.startPnts[pnts.startPnts.length - 1]);
            var p2 = line2.center().add(p).sub(o);
            this.drawBezierLine(line1, p1);
            this.drawBezierLine(line2, p2);
        };
        Engine.prototype.drawBezier = function (wall, p) {
            var pnts = wall.outline;
            this.context.strokeStyle = "#ff0000";
            var line1 = new IMAPIC2D.Line(pnts.startPnts[0], pnts.endPnts[pnts.endPnts.length - 1]);
            var line2 = new IMAPIC2D.Line(pnts.endPnts[0], pnts.startPnts[pnts.startPnts.length - 1]);
            this.drawBezierLine(line1, p);
            this.drawBezierLine(line2, p);
        };
        Engine.prototype.drawWalls = function (walls) {
            var _this = this;
            if (walls.length < 1)
                return;
            var state = IMAPIC2D._DEFINES_.WALL;
            var unHovered = IMAPIC2D.Core.Utils.removeIf(walls, function (wall) {
                return wall === _this.handle.active.wall || wall === _this.handle.selected.wall;
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
            if (selected != null) {
                drawPoly(selected, 2);
            }
            if (hovered != null && hovered != selected) {
                var cp = hovered.controlPoint;
                if (cp === undefined) {
                    drawPoly(hovered, 1);
                }
                else {
                    this.drawBasic.drawCircle(this.handle.convert(cp), 4, '#00ff00', true, 1);
                    this.drawPixelLines([new IMAPIC2D.Line(hovered.start, cp), new IMAPIC2D.Line(hovered.end, cp)], 1, '#0000ff');
                    this.drawBezier(hovered, hovered.controlPoint);
                }
            }
        };
        Engine.prototype.drawRoomWallLine = function (room) {
        };
        Engine.prototype.drawWallAndInWallLines = function (walls, showInwallLen, showWallLen) {
            var _this = this;
            if (showInwallLen === void 0) { showInwallLen = true; }
            if (showWallLen === void 0) { showWallLen = true; }
            var helpLineArrays = [];
            var fontLinesArrays = [];
            var self = this;
            walls.forEach(function (wall) {
                if (!wall) {
                    return;
                }
                var _line = _this.toggle.showWallInnerLine ? wall.restrictLine : wall.getLine();
                var _Start = _line.start;
                var _End = _line.end;
                if (showInwallLen) {
                    var inWalls = wall.onItems;
                    inWalls.sort(function (a, b) {
                        return a.offset - b.offset;
                    });
                    inWalls.forEach(function (item) {
                        var line = item.getLine();
                        (item.dir < 0) && line.set(line.end, line.start);
                        self.getHelpLineAndLabel(new IMAPIC2D.Line(_Start, line.start), helpLineArrays, fontLinesArrays, wall.thickness);
                        self.getHelpLineAndLabel(line, helpLineArrays, fontLinesArrays, wall.thickness);
                        _Start = line.end.clone();
                    });
                }
                _this.getHelpLineAndLabel(new IMAPIC2D.Line(_Start, _End), helpLineArrays, fontLinesArrays, wall.thickness);
            });
            this.drawPixelLines(helpLineArrays, IMAPIC2D._DEFINES_.HELP_LINE.WIDTH, IMAPIC2D._DEFINES_.HELP_LINE.COLOR);
            this.drawWallLengthLabels(fontLinesArrays);
        };
        Engine.prototype.drawWallLengthLabels_Input = function (line) {
            if (!this.toggle.isPC)
                return;
            var input = this.setInput(line, this.wallLengthSettingId);
            var wls = $("#" + this.wallLengthSettingId);
            if (wls.is(':focus')) {
                setTimeout(function () { wls.select(); }, 50);
            }
        };
        Engine.prototype.setInput = function (line, Id, dx, dy) {
            if (dx === void 0) { dx = 0; }
            if (dy === void 0) { dy = 0; }
            var str = "" + Math.round(line.length() * 10.0);
            var input = $('#' + Id);
            if (input.css('display', 'none')) {
                input.show();
            }
            var tmpPos = this.handle.convert(line.center());
            input.css('left', tmpPos.x - 20 + dx);
            input.css('top', tmpPos.y + dy);
            input.val(str);
            return input;
        };
        Engine.prototype.drawWallLengthLabels_RectRoom = function (line1, line2) {
            if (!this.toggle.isPC)
                return;
            this.setInput(line1, this.wallLengthSettingId);
            this.setInput(line2, this.wallLengthSettingId2);
        };
        Engine.prototype.drawRectAndText = function (position, textStr, rectW, rectH) {
            this.context.beginPath();
            this.context.fillStyle = "#000000";
            this.context.rect(position.x - rectW / 2, position.y - rectH / 2, rectW, rectH);
            this.context.fill();
            this.context.fillStyle = "#ffffff";
            this.context.fillText(textStr, position.x, position.y);
            this.context.closePath();
        };
        Engine.prototype.drawWallLengthLabels = function (lineArr) {
            var _this = this;
            this.context.fillStyle = "#000000";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.strokeStyle = "#ffffff";
            this.context.lineWidth = 4;
            this.context.font = "normal 12px Arial";
            var scope = this;
            lineArr.forEach(function (line) {
                var tmpPos = _this.handle.convert(line.center());
                var slope = line.slope();
                slope = line.end.x < line.start.x ? slope + Math.PI : slope;
                var str = _this.toggle.showTextMeter ? "" + Math.round(line.length()) / 100 + "m" : "" + Math.round(line.length() * 10.0);
                _this.context.save();
                _this.context.translate(tmpPos.x, tmpPos.y);
                _this.context.rotate(slope);
                _this.context.strokeText(str, 0, 0);
                _this.context.fillText(str, 0, 0);
                _this.context.restore();
            });
        };
        Engine.prototype.getHelpLineAndLabel = function (line, ArrLine, ArrLabel, wallThickness) {
            if (line.length() < 40) {
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
            this.backFaceCulling = backFaceCulling;
            this._groupDynamic = new THREE.Group();
            this.textureLoader = new THREE.TextureLoader();
            this.matFront = new THREE.MeshBasicMaterial({ color: 0xffffff });
            this.matBack = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
            this.matDouble = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
            this.matFake = new THREE.MeshBasicMaterial({
                color: 0xaaaaaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.1,
                visible: false
            });
            this.typeDefault = "WallEx";
            this.forTEST = false;
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
        RoomGenerator.prototype.setCallback = function (fun) {
            this.callback = fun;
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
            var pointsArray = [];
            if (holes === undefined || !holes || holes.length < 1)
                return pointsArray;
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
        RoomGenerator.prototype.computeHoleLines = function (holes, isEdge1, line) {
            var pointsArray = [line.start];
            if (holes === undefined || !holes || holes.length < 1)
                return [line.start, line.end];
            holes.forEach(function (hole) {
                var y_bot = hole["bottom"];
                var x_left = isEdge1 ? hole["offsetStart_1"] : hole["offsetStart_2"];
                var x_right = x_left + hole["length"];
                var p1 = line.scale(x_left).add(line.start);
                var p2 = line.scale(x_right).add(line.start);
                y_bot > 100 && pointsArray.push(p1, p2);
            });
            pointsArray.push(line.end);
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
        RoomGenerator.prototype.addWallCornerStripMesh = function (points, wall_height, mat, type) {
            if (type === void 0) { type = this.typeDefault; }
            for (var i = 0; i < points.length - 1; i++) {
                var line = new IMAPIC2D.Line().fromNumber(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                var shape = this.createWallShape(line.length(), wall_height);
                var mesh = this.sideShapeToMesh(line, shape, mat);
                mesh.userData.height = wall_height;
                this.callback(mesh, type);
            }
        };
        RoomGenerator.prototype.addTopBot = function (points, wall_height, mat, botDistance, height) {
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
                geo.translate(0, bot, 0);
                var mesh = new THREE.Mesh(geo, mat1);
                this.callback(mesh, this.typeDefault);
            }
            var top = height !== undefined ? height + bot : wall_height + bot;
            if (top + minDistance < wall_height || height === undefined) {
                var geoTop = geo.clone();
                geoTop.translate(0, top - bot, 0);
                var mesh = new THREE.Mesh(geoTop, mat);
                this.callback(mesh, this.typeDefault);
            }
        };
        RoomGenerator.prototype.computeWallArea = function (size, holes) {
            var areas = 0;
            for (var i = 0; i < holes.length; i++) {
                var positions = holes[i];
                var height = positions[3];
                var pStart = this.toVec2(positions[0]);
                var pEnd = this.toVec2(positions[1]);
                areas += pEnd.distanceTo(pStart) * height;
            }
            return (size - areas) * 0.0001;
        };
        RoomGenerator.prototype.toVec2 = function (p) {
            return new IMAPIC2D.Vec2(p.x, p.y);
        };
        RoomGenerator.prototype.addWallInOutEdgeMesh = function (p1, p2, wall_uuid, wall_height, holes, isEdge1, isInnerWall, isCW) {
            var line = new IMAPIC2D.Line().fromNumber(p1.x, p1.y, p2.x, p2.y);
            var shape = this.createWallShape(line.length(), wall_height);
            var _holes = this.pushHolesToShape(shape, holes, isEdge1);
            var isInner = isInnerWall !== 0;
            var mat = this.backFaceCulling && !isInner ? this.matBack : this.matFront;
            var mesh = this.sideShapeToMesh(line, shape, mat.clone(), 0, isInnerWall, isCW);
            var type = isInner ? 'Wall' : this.typeDefault;
            mesh.userData._type = type;
            if (isInner) {
                mesh.uuid = wall_uuid;
                this.computeMeshUV(mesh.geometry, mesh.material, IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.WALL);
                var wallLen = line.length();
                mesh.userData.area = this.computeWallArea(wallLen * wall_height, _holes);
                mesh.userData.length = wallLen;
                mesh.userData.height = wall_height;
                mesh.userData.slope = -line.slope();
                var shapeInner = this.createWallShape(line.length(), wall_height);
                var meshInner = this.sideShapeToMesh(line, shapeInner, this.matFake, 0, isInnerWall, isCW);
                meshInner.userData.length = wallLen;
                meshInner.userData.height = wall_height;
                meshInner.userData.slope = mesh.userData.slope;
                this.callback(meshInner, "WallExInner");
            }
            this.callback(mesh, type);
            return _holes;
        };
        RoomGenerator.prototype.addHoleMesh = function (holes1, holes2, wall_height, wall_width, mat) {
            if (holes1.length !== holes2.length) {
                console.error('洞口内外个数不一致？！！');
                return;
            }
            for (var i = 0; i < holes1.length; i++) {
                var positions = holes1[i];
                var height = positions[3];
                var bot = positions[2];
                var pStart = this.toVec2(positions[0]);
                var pEnd = this.toVec2(positions[1]);
                var line = new IMAPIC2D.Line(pStart, pEnd);
                var disVec = line.scale(wall_width / 2.0);
                var shape = this.createWallShape(wall_width, height);
                var front_Line = pStart.rotatedLine(disVec, Math.PI / 2.0);
                var front_mesh = this.sideShapeToMesh(front_Line, shape, mat, bot);
                this.callback(front_mesh, this.typeDefault);
                var back_Line = pEnd.rotatedLine(disVec.negate(), Math.PI / 2.0);
                var back_mesh = this.sideShapeToMesh(back_Line, shape, mat, bot);
                this.callback(back_mesh, this.typeDefault);
                var points = [front_Line.start, front_Line.end, back_Line.start, back_Line.end];
                this.addTopBot(points, wall_height, mat, bot, height);
            }
        };
        RoomGenerator.prototype.generateWall = function (group, wall, inWalls) {
            var scope = this;
            var _starts = wall.start;
            var _ends = wall.end;
            var pnts = _starts.concat(_ends);
            this.addTopBot(pnts, wall.height, this.matDouble, undefined, undefined);
            this.addWallCornerStripMesh(_starts, wall.height, this.matFront);
            this.addWallCornerStripMesh(_ends, wall.height, this.matFront);
            this.generateInOutWallAndHoles(wall, inWalls);
            var pntsEx = [this.getCenterByPoints(wall.start), this.getCenterByPoints(wall.end)];
            this.addWallCornerStripMesh(pntsEx, wall.height, this.matFake, "WallExIntersect");
        };
        RoomGenerator.prototype.getCenterByPoints = function (pntList) {
            if (pntList.length > 2)
                return pntList[1];
            return new IMAPIC2D.Vec2().fromJson(pntList[0]).center(new IMAPIC2D.Vec2().fromJson(pntList[1])).toJson();
        };
        RoomGenerator.prototype.generateInOutWallAndHoles = function (wall, inWalls) {
            var _starts = wall.start;
            var _ends = wall.end;
            var isCW = wall.isCW;
            var roomCount = wall.usedByRooms;
            var isInner1, isInner2;
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
            var s1 = _starts[_starts.length - 1];
            var e1 = _ends[0];
            var s2 = _starts[0];
            var e2 = _ends[_ends.length - 1];
            var pnts1 = this.addWallInOutEdgeMesh(_starts[_starts.length - 1], _ends[0], wall.id, wall.height, inWalls, true, isInner1, isCW);
            var pnts2 = this.addWallInOutEdgeMesh(_starts[0], _ends[_ends.length - 1], wall.id, wall.height, inWalls, false, isInner2, isCW);
            this.addHoleMesh(pnts1, pnts2, wall.height, wall.width, this.matFront);
        };
        RoomGenerator.prototype.ceilPowerOfTwo = function (value) {
            return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
        };
        RoomGenerator.prototype.recomputeShapeGeometryUVs = function (geometry) {
            var uvAttr = geometry.getAttribute('uv');
            var uvs = uvAttr.array;
            geometry._uv = [];
            var min = new THREE.Vector2(Infinity, Infinity);
            var max = new THREE.Vector2(-Infinity, -Infinity);
            for (var i = 0; i < uvs.length; i += 2) {
                geometry._uv.push(uvs[i]);
                geometry._uv.push(uvs[i + 1]);
                min.x = Math.min(uvs[i], min.x);
                max.x = Math.max(uvs[i], max.x);
                min.y = Math.min(uvs[i + 1], min.y);
                max.y = Math.max(uvs[i + 1], max.y);
            }
            var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
            for (var i = 0; i < uvs.length / 2; i++) {
                uvAttr.setXY(i, (uvs[i * 2] - min.x) / range.x, (uvs[i * 2 + 1] - min.y) / range.y);
            }
            geometry.attributes['uv'].needsUpdate = true;
            geometry.attributes['uv2'] = geometry.attributes['uv'].clone();
            return range;
        };
        RoomGenerator.prototype.updateTexture = function (texture, range, material) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.needsUpdate = true;
            if (0 && this.forTEST) {
                texture.repeat.set(range.x / range.y, 1);
            }
            else {
                texture.repeat.set(range.x / texture.image.width, range.y / texture.image.height);
            }
        };
        RoomGenerator.prototype.computeMeshUV = function (geometry, material, mapUrls) {
            var scope = this;
            var range = this.recomputeShapeGeometryUVs(geometry);
            material.uuid = mapUrls.UUID;
            this.textureLoader.load(mapUrls.MAP, function (texture) {
                scope.updateTexture(texture, range, material);
                material.map = texture;
                material.needsUpdate = true;
            });
            if (this.forTEST) {
                this.textureLoader.load(mapUrls.LIGHTMAP, function (texture) {
                    scope.updateTexture(texture, range, material);
                    material.lightMap = texture;
                    material.needsUpdate = true;
                });
            }
            else {
                this.textureLoader.load(mapUrls.NORMAL, function (texture) {
                    scope.updateTexture(texture, range, material);
                    material.normalMap = texture;
                    material.needsUpdate = true;
                });
            }
        };
        RoomGenerator.prototype.generateGroundGeometry = function (points, baseY, needThinckness) {
            if (needThinckness === void 0) { needThinckness = false; }
            var shape = new THREE.Shape();
            shape.setFromPoints(points);
            var geometry;
            if (needThinckness) {
                var extrudeSettings = {
                    depth: -100,
                    bevelEnabled: false,
                };
                geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            }
            else {
                geometry = new THREE.ShapeBufferGeometry(shape, 1);
            }
            geometry.rotateX(Math.PI / 2.0);
            geometry.translate(0, baseY, 0);
            return geometry;
        };
        RoomGenerator.prototype.generateFootLines = function (line, holes) {
            var _starts = line.start;
            var _ends = line.end;
        };
        RoomGenerator.prototype.generateRoom = function (room) {
            var points = room.ground;
            var matFront = this.matFront.clone();
            var matBack = this.matBack.clone();
            if (!this.backFaceCulling) {
                matFront.side = THREE.DoubleSide;
                matBack.side = THREE.DoubleSide;
            }
            var geoFloor = this.generateGroundGeometry(points, 0);
            var meshFloor = new THREE.Mesh(geoFloor, matBack);
            this.computeMeshUV(geoFloor, meshFloor.material, IMAPIC2D._DEFINES_.DEFAULT_TEXTURE.FLOOR);
            meshFloor.uuid = room.id;
            meshFloor.receiveShadow = true;
            meshFloor.userData.area = Math.abs(THREE.ShapeUtils.area(points) * 0.0001);
            meshFloor.userData._type = 'Floor';
            this.callback(meshFloor, 'Floor');
            var geoRoof = this.generateGroundGeometry(points, room.height, false);
            var meshRoof = new THREE.Mesh(geoRoof, matFront);
            var _geo = this.generateGroundGeometry(room.truePoints, room.height, true);
            meshRoof.userData._geometry = _geo;
            meshRoof.userData._type = 'Roof';
            this.callback(meshRoof, 'Roof');
            return room.center;
        };
        return RoomGenerator;
    }());
    IMAPIC3D.RoomGenerator = RoomGenerator;
})(IMAPIC3D || (IMAPIC3D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var Item = (function () {
        function Item() {
        }
        Item.GetType = function (obj) {
            return obj && obj.userData && obj.userData._type ? obj.userData._type : false;
        };
        Item.CanMoving = function (obj) {
            var type = this.GetType(obj);
            return type && type.indexOf('Item') > -1;
        };
        Item.isType = function (obj, type) {
            return this.GetType(obj) == type;
        };
        Item.likeType = function (obj, type) {
            var _type = this.GetType(obj);
            return _type && _type.indexOf(type) > -1;
        };
        Item.isTypeInList = function (obj, typeList) {
            for (var i = 0; i < typeList.length; i++) {
                if (this.likeType(obj, typeList[i]))
                    return true;
            }
            return false;
        };
        Item.pushIf = function (array, tResult, func) {
            array.forEach(function (element) {
                func(element) && tResult.push(element);
            });
            return tResult;
        };
        Item.isFloorInWall = function (type) {
            var num = type.slice('InWallItem'.length);
            num = Math.floor(parseFloat(num));
            return num < 10 || num == 11 || num > 19;
        };
        Item.findHouseTypes = function (group, results) {
            var list = group.children;
            for (var i = 0; i < list.length; i++) {
                var element = list[i];
                var type = element.userData && element.userData._type ? element.userData._type : undefined;
                if (element.type == "Group") {
                    if (type && (type.indexOf("InWall") > -1 || type == "OnRoofItem")) {
                        results.push(element);
                    }
                    else {
                        this.findHouseTypes(element, results);
                    }
                }
                else if (element.type == "Mesh") {
                    if (type && (type.indexOf("Wall") == 0 || type == "Floor" || type == "Roof")) {
                        results.push(element);
                    }
                }
            }
        };
        Item.dispose_House = function (scene) {
            var list = [];
            Item.findHouseTypes(scene, list);
            Item.disposeItems(list);
        };
        Item.disposeMaterial = function (mtrl) {
            if (mtrl.map)
                mtrl.map.dispose();
            if (mtrl.lightMap)
                mtrl.lightMap.dispose();
            if (mtrl.bumpMap)
                mtrl.bumpMap.dispose();
            if (mtrl.normalMap)
                mtrl.normalMap.dispose();
            if (mtrl.specularMap)
                mtrl.specularMap.dispose();
            if (mtrl.envMap)
                mtrl.envMap.dispose();
            mtrl.dispose();
            mtrl = null;
        };
        Item.disposeMesh = function (node) {
            if (node instanceof THREE.Mesh) {
                if (node.geometry) {
                    node.geometry.dispose();
                    node.geometry = null;
                }
                var mat = node.material;
                if (mat) {
                    if (Array.isArray(mat)) {
                        mat.forEach(function (mtrl) {
                            Item.disposeMaterial(mtrl);
                        });
                    }
                    else {
                        Item.disposeMaterial(mat);
                    }
                }
                node = null;
            }
        };
        Item.disposeHierarchy = function (node, callback) {
            for (var i = node.children.length - 1; i >= 0; i--) {
                var child = node.children[i];
                node.remove(child);
                Item.disposeHierarchy(child, callback);
                callback(child);
            }
        };
        Item.disposeItems = function (removeItems) {
            for (var i = 0; i < removeItems.length; i++) {
                var element = removeItems[i];
                element.parent.remove(element);
                if (element.type == "Group") {
                    Item.disposeHierarchy(element, this.disposeMesh);
                }
                else {
                    Item.disposeMesh(element);
                }
            }
        };
        Item.Type = {
            wallInner: "Wall",
            wallUseness: "WallEx",
            wallIntersect: "WallExIntersect",
        };
        return Item;
    }());
    IMAPIC3D.Item = Item;
})(IMAPIC3D || (IMAPIC3D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var ItemSelect = (function () {
        function ItemSelect(engine) {
            this.engine = engine;
            this.raycaster = new THREE.Raycaster();
            this.ctx = this.engine.Get_Renderer().domElement;
            return this;
        }
        ItemSelect.prototype.getIntersect = function (pointer, objects) {
            var rect = this.ctx.getBoundingClientRect();
            var x = (pointer.clientX - rect.left) / rect.width;
            var y = (pointer.clientY - rect.top) / rect.height;
            var pointerVector = new THREE.Vector2((x * 2) - 1, -(y * 2) + 1);
            this.raycaster.setFromCamera(pointerVector, this.engine.Get_Camera());
            var intersections = this.raycaster.intersectObjects(objects, true);
            if (!intersections || intersections.length < 1) {
                return false;
            }
            return intersections[0];
        };
        ItemSelect.prototype.findSelectedEntity = function (obj) {
            var obj = IMAPIC3D.Item.GetType(obj) ? obj : obj.parent;
            if (IMAPIC3D.Item.GetType(obj)) {
                var parent = obj.parent;
                if (parent && IMAPIC3D.Item.GetType(parent)) {
                    obj = parent;
                }
            }
            return IMAPIC3D.Item.GetType(obj) ? obj : undefined;
        };
        ItemSelect.prototype.intersectObjects = function (pointer, arrList) {
            var intersection = this.getIntersect(pointer, arrList);
            if (!intersection) {
                return undefined;
            }
            return this.findSelectedEntity(intersection.object);
        };
        ItemSelect.prototype.GetSelected = function (pointer) {
            var selectGroup = this.engine.Get_SelectableGroup();
            var selected = this.intersectObjects(pointer, selectGroup.children);
            return selected;
        };
        ItemSelect.prototype.changeGroupEmissive = function (item, color) {
            var objects = item.children;
            for (var i = 0; i < objects.length; i++) {
                objects[i].material.emissive.setHex(color);
            }
        };
        return ItemSelect;
    }());
    IMAPIC3D.ItemSelect = ItemSelect;
})(IMAPIC3D || (IMAPIC3D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var HandleEvent = (function (_super) {
        __extends(HandleEvent, _super);
        function HandleEvent(engine) {
            var _this = _super.call(this) || this;
            _this.engine = engine;
            _this.placeList = [];
            _this.mouseDowned = false;
            _this.enabled = true;
            _this.translationSnapStep = 100;
            _this.positionStart = new THREE.Vector3();
            _this.pointStart = new THREE.Vector3();
            _this.worldPositionStart = new THREE.Vector3();
            _this.worldQuaternionStart = new THREE.Quaternion();
            _this.worldScaleStart = new THREE.Vector3();
            _this.unitY = new THREE.Vector3(0, 1, 0);
            _this.renderer = _this.engine.Get_Renderer();
            _this.scene = _this.engine.Get_Scene();
            _this.camera = _this.engine.Get_Camera();
            _this.size = _this.engine.Get_Size();
            _this.selectableGroup = _this.engine.Get_SelectableGroup();
            _this.init();
            return _this;
        }
        HandleEvent.prototype.init = function () {
            this.init_misc();
            window.addEventListener("resize", this.resize.bind(this), false);
            this.renderer.domElement.addEventListener("mousedown", this.handleMouseDown.bind(this), false);
            this.renderer.domElement.addEventListener("mouseup", this.handelMouseUp.bind(this), false);
            this.renderer.domElement.addEventListener("mousemove", this.handleMouseMove.bind(this), false);
            window.addEventListener("keydown", this.handleKeyDown.bind(this), false);
            window.addEventListener("keyup", this.handleKeyUp.bind(this), false);
            this.renderer.domElement.addEventListener("touchstart", this.handleMouseDown.bind(this), false);
            this.renderer.domElement.addEventListener("touchmove", this.handleMouseMove.bind(this), false);
            this.renderer.domElement.addEventListener("touchend", this.handelMouseUp.bind(this), false);
            this.renderer.domElement.addEventListener("touchcancel", this.handelMouseUp.bind(this), false);
            this.renderer.domElement.addEventListener("touchleave", this.handelMouseUp.bind(this), false);
            this.resize();
        };
        HandleEvent.prototype.handleKeyDown = function (event) {
            var transTontrol = this.engine.Get_TransControl();
            var control = this.engine.Get_OrbitControl();
            var camera = this.engine.Get_Camera();
            var distance = 500;
            switch (event.keyCode) {
                case 17:
                    transTontrol.setTranslationSnap(this.translationSnapStep);
                    break;
                case 84:
                case 116:
                    camera.position.set(0, distance, 0);
                    camera.up.set(0, 0, -1);
                    control.target.set(0, 0, 0);
                    control.update();
                    break;
                case 66:
                    camera.position.set(0, -distance, 0);
                    camera.up.set(0, 0, -1);
                    control.target.set(0, 0, 0);
                    control.update();
                    break;
                case 76:
                    camera.position.set(-distance, 0, 0);
                    camera.up.set(0, 1, 0);
                    control.target.set(0, 0, 0);
                    control.update();
                    break;
                case 70:
                    camera.position.set(0, 0, distance);
                    camera.up.set(0, 1, 0);
                    control.target.set(0, 0, 0);
                    control.update();
                    break;
                default:
                    break;
            }
        };
        HandleEvent.prototype.handleKeyUp = function (event) {
            var control = this.engine.Get_TransControl();
            switch (event.keyCode) {
                case 17:
                default:
                    control.setTranslationSnap(null);
                    break;
            }
        };
        HandleEvent.prototype.init_misc = function () {
            this.mouse = new THREE.Vector2();
            this.selected = null;
            this.selectedHelper = new THREE.BoxHelper();
            this.scene.add(this.selectedHelper);
            this.itemSelect = new IMAPIC3D.ItemSelect(this.engine);
        };
        HandleEvent.prototype.resize = function () {
            this.size.set(window.innerWidth, window.innerHeight);
            var aspect = this.size.x / this.size.y;
            if (this.camera instanceof THREE.PerspectiveCamera) {
                this.camera.aspect = aspect;
                this.camera.updateProjectionMatrix();
            }
            else if (this.camera instanceof THREE.OrthographicCamera) {
                this.camera.left = -this.size.x / 2;
                this.camera.right = this.size.x / 2;
                this.camera.top = this.size.y / 2;
                this.camera.bottom = -this.size.y / 2;
                this.camera.updateProjectionMatrix();
            }
            this.renderer.setSize(this.size.x, this.size.y);
        };
        HandleEvent.prototype.updateSelected = function (event) {
            var selected = this.itemSelect.GetSelected(event);
            if (this.selected != selected) {
                var transControl = this.engine.Get_TransControl();
                this.placeList = this.engine.Get_Placable(selected);
                console.log(selected);
                if (IMAPIC3D.Item.isTypeInList(selected, ["OnWallItem", "InWallItem"])) {
                    transControl.detach();
                }
                else {
                    IMAPIC3D.Item.CanMoving(selected) ? transControl.attach(selected) : transControl.detach();
                    transControl.setPlaceList(this.placeList);
                }
                this.selectedHelper.setFromObject(selected);
                this.selected = selected;
                var type = IMAPIC3D.Item.GetType(selected);
                type && IMAPIC3D.Item.isTypeInList(selected, ["Wall", "Roof", "Floor"]) && this.dispatchEvent({ type: "PlaceClick", itemType: type, object: selected });
            }
        };
        HandleEvent.prototype.getPointer = function (event) {
            return event.changedTouches ? event.changedTouches[0] : event;
        };
        HandleEvent.prototype.handleMouseDown = function (event) {
            if (this.enabled === false)
                return;
            var target = event.target;
            if (target !== this.renderer.domElement)
                return;
            target.focus();
            this.mouseDowned = true;
            event = this.getPointer(event);
            this.mouse.set(event.clientX, event.clientY);
            if (this.selected) {
                var selected = this.itemSelect.GetSelected(event);
                var enable = !IMAPIC3D.Item.CanMoving(selected) || this.selected != selected ? true : false;
                this.engine.toggleControls_Orbit(enable);
                this.selectType_IsInWall = IMAPIC3D.Item.likeType(selected, 'InWallItem');
                this.selectType_IsOnWall = IMAPIC3D.Item.isType(selected, 'OnWallItem');
                if (!enable) {
                    var intersected = this.itemSelect.getIntersect(event, this.placeList);
                    if (!intersected)
                        return;
                }
            }
        };
        HandleEvent.prototype.handelMouseUp = function (event) {
            if (this.enabled === false)
                return;
            this.mouseDowned = false;
            this.engine.toggleControls_Orbit(true);
            event = this.getPointer(event);
            if ((event.clientX != this.mouse.x) || (event.clientY != this.mouse.y)) {
                return;
            }
            this.updateSelected(event);
            this.selectedHelper.update();
        };
        HandleEvent.prototype.handleMouseMove = function (event) {
            if (this.enabled === false)
                return;
            if (!this.mouseDowned || !this.selected || !IMAPIC3D.Item.CanMoving(this.selected) || this.engine.controlsEnabled()) {
                return;
            }
            var intersected = this.itemSelect.getIntersect(event, this.placeList);
            if (!intersected)
                return;
            if (this.selectType_IsInWall || this.selectType_IsOnWall) {
                this.moveOnOrInWallItem(intersected);
                this.selectedHelper.update();
            }
            else {
            }
        };
        HandleEvent.prototype.setAngleByWallNormal = function (object, dir) {
            var angle = Math.atan2(-dir.z, dir.x) + Math.PI / 2.0;
            object.setRotationFromAxisAngle(this.unitY, angle);
        };
        HandleEvent.prototype.moveOnOrInWallItem = function (intersected) {
            var dir = intersected.face.normal;
            var minValue = 0.000001;
            var point = intersected.point;
            var wallHeight = intersected.object.userData.height;
            var uv = intersected.uv;
            var wallLength = intersected.object.userData.length;
            var slope = intersected.object.userData.slope;
            var object = this.selected;
            var array = this.selectedHelper.geometry.attributes["position"].array;
            if (this.selectType_IsInWall) {
                this.setAngleByWallNormal(object, dir);
                var size = {
                    x: (array[0] - array[3]),
                    y: (array[1] - array[7])
                };
                point.y -= size.y / 2;
            }
            else if (this.selectType_IsOnWall) {
                var size = {
                    x: (array[2] - array[14]) / 2,
                    y: (array[1] - array[7]) / 2
                };
                this.setAngleByWallNormal(object, dir);
                object.rotateX(Math.PI / 2);
            }
            var translationSnap = this.engine.Get_TransControl().translationSnap;
            if (translationSnap != null) {
                var x = Math.abs(object.position.x - point.x);
                var y = Math.abs(object.position.y - point.y);
                var z = Math.abs(object.position.z - point.z);
                var max = Math.max(x, Math.max(y, z));
                if (x == max) {
                    point.x = Math.round(point.x / translationSnap) * translationSnap;
                }
                else if (y == max) {
                    point.y = Math.round(point.y / translationSnap) * translationSnap;
                }
                else if (z == max) {
                    point.z = Math.round(point.z / translationSnap) * translationSnap;
                }
            }
            console.log(point.x, point.y, point.z);
            object.position.copy(point);
            object.updateMatrixWorld(true);
        };
        return HandleEvent;
    }(THREE.Object3D));
    IMAPIC3D.HandleEvent = HandleEvent;
})(IMAPIC3D || (IMAPIC3D = {}));
var IMAPIC3D;
(function (IMAPIC3D) {
    var Engine = (function () {
        function Engine(container, width, height, pixelRatio) {
            this._enableBackCulling = false;
            this._sceneCenter = new THREE.Vector3();
            this._houseGroup = new THREE.Group();
            this._selectableGroup = new THREE.Group();
            this.toggle = {
                isPC: true
            };
            this._container = container;
            this._canvasSize = new THREE.Vector2(width, height);
            this._pixelRatio = pixelRatio;
            return this;
        }
        Engine.prototype.init = function () {
            this.initScene();
            this.animate();
        };
        Engine.prototype.Get_TransControl = function () {
            return this._tranControls;
        };
        Engine.prototype.Get_OrbitControl = function () {
            return this._orbControls;
        };
        Engine.prototype.Get_handle = function () {
            return this.handleEvent;
        };
        Engine.prototype.initControls = function (camera, domElement, scene) {
            this.handleEvent = new IMAPIC3D.HandleEvent(this);
            this._orbControls = new THREE.OrbitControls(camera, domElement);
            this._orbControls.target.copy(this._sceneCenter);
            var scope = this;
            this._orbControls.update();
            this._orbControls.addEventListener('changeGrid', function (event) {
                var camera = scope.Get_Camera();
                scope.grid.geometry.dispose();
                var scale = event.offset;
                if (camera instanceof THREE.PerspectiveCamera) {
                    scale = Math.round(scale / 300);
                    scale = Math.max(1, scale);
                    scale = Math.min(4, scale);
                    scale = 40 / scale;
                }
                else if (camera instanceof THREE.OrthographicCamera) {
                    scale = camera.zoom;
                    scale = Math.round(scale * 10);
                    scale = Math.max(4, scale);
                    scale = Math.min(40, scale);
                }
                var grid = new THREE.GridHelper(1000, scale);
                scope.grid.geometry = grid.geometry;
                scope.handleEvent.translationSnapStep = 1000 / scale;
            });
            var screenRatio = this.toggle.isPC ? 0.7 : 1.5;
            this._tranControls = new TransformControls(camera, domElement);
            this._tranControls.setRotationSnap(Math.PI / 4);
            this._tranControls.setSize(screenRatio);
            this._tranControls.addEventListener('change', this.render.bind(this));
            scene.add(this._tranControls);
            this._tranControls.addEventListener('dragging-changed', function (event) {
                scope._orbControls.enabled = !event.value;
                scope.handleEvent.enabled = !event.value;
            });
            this._tranControls.addEventListener('objectChange', function (event) {
                scope.handleEvent.selectedHelper.update();
            });
        };
        Engine.prototype.initScene = function () {
            this._cameraPer = new THREE.PerspectiveCamera(60, this._canvasSize.x / this._canvasSize.y, 1, 100000);
            this._cameraPer.position.set(0, 400, 600);
            this._cameraOth = new THREE.OrthographicCamera(this._canvasSize.x / -2, this._canvasSize.x / 2, this._canvasSize.y / 2, this._canvasSize.y / -2, -9000, 9000);
            this._cameraOth.position.z = 500;
            this._camera = this._cameraOth;
            this._scene = new THREE.Scene();
            this.initRenderer(this._container, this._canvasSize, this._pixelRatio);
            this.initLights(this._scene, this._camera, this._renderer);
            this.initBackground(this._scene);
            this._scene.add(this._houseGroup);
            this._scene.add(this._selectableGroup);
            this.initControls(this._camera, this._renderer.domElement, this._scene);
        };
        Engine.prototype.initRenderer = function (container, size, ratio) {
            this._renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: false });
            this._renderer.setPixelRatio(ratio);
            this._renderer.setSize(size.x, size.y);
            this._renderer.autoClear = true;
            container.appendChild(this._renderer.domElement);
        };
        Engine.prototype.initComposer = function (scene, camera, renderer) {
            this._composer = new THREE.EffectComposer(renderer);
            this._composer.addPass(new THREE.RenderPass(scene, camera));
            this._outlinePass = new THREE.OutlinePass(new THREE.Vector2(this._canvasSize.x, this._canvasSize.y), scene, camera);
            this._outlinePass.visibleEdgeColor.set(0x00ff00);
            this._outlinePass.hiddenEdgeColor.set(0x00ff00);
            this._composer.addPass(this._outlinePass);
            var copyPass = new THREE.ShaderPass(THREE.CopyShader);
            copyPass.renderToScreen = true;
            this._composer.addPass(copyPass);
        };
        Engine.prototype.setOutlineObject = function (object) {
            this._outlinePass.selectedObjects = object ? [object] : [];
        };
        Engine.prototype.setFloorplan = function (floorplan) {
            this.floorplan = floorplan;
            this._tranControls.setFloorplan(floorplan);
        };
        Engine.prototype.Get_Rooms = function () {
            return this.floorplan.getRooms();
        };
        Engine.prototype.Get_Renderer = function () {
            return this._renderer;
        };
        Engine.prototype.Get_Composer = function () {
            return this._composer;
        };
        Engine.prototype.Get_Camera = function () {
            return this._camera;
        };
        Engine.prototype.Get_Size = function () {
            return this._canvasSize;
        };
        Engine.prototype.Get_SelectableGroup = function () {
            return this._selectableGroup;
        };
        Engine.prototype.Get_HouseGroup = function () {
            return this._houseGroup;
        };
        Engine.prototype.Get_Scene = function () {
            return this._scene;
        };
        Engine.prototype.Get_Placable = function (selected) {
            var placeList = [];
            if (IMAPIC3D.Item.likeType(selected, "InWallItem")) {
                return IMAPIC3D.Item.pushIf(this._houseGroup.children, placeList, function (item) {
                    return IMAPIC3D.Item.isType(item, "WallExIntersect");
                });
            }
            if (IMAPIC3D.Item.isType(selected, "OnWallItem")) {
                return IMAPIC3D.Item.pushIf(this._houseGroup.children, placeList, function (item) {
                    return IMAPIC3D.Item.isType(item, "WallExInner");
                });
            }
            if (IMAPIC3D.Item.isType(selected, "OnRoofItem")) {
                return [this.roof];
            }
            var selectList = this._selectableGroup.children;
            if (IMAPIC3D.Item.isType(selected, "OnItem")) {
                var types = ["OnFloorItem", "OnItem", "OnWallItem"];
                IMAPIC3D.Item.pushIf(selectList, placeList, function (item) {
                    if (IMAPIC3D.Item.isType(item, "GroupItem")) {
                        IMAPIC3D.Item.pushIf(item.children, placeList, function (item2) {
                            return IMAPIC3D.Item.isTypeInList(item2, types);
                        });
                        return false;
                    }
                    return selected != item && IMAPIC3D.Item.isTypeInList(item, types);
                });
            }
            placeList.push(this.ground);
            return placeList;
        };
        Engine.prototype.toggleControls_Orbit = function (value) {
            this._orbControls.enabled = value;
        };
        Engine.prototype.controlsEnabled = function () {
            return this._orbControls.enabled;
        };
        Engine.prototype.initLights_bp3d = function (camera, scene, renderer) {
            var light = new THREE.HemisphereLight(0xffffff, 0x888888, 1.3);
            light.position.set(0, 280, 0);
            scene.add(light);
            var dirLight = this.dirLight;
            dirLight = new THREE.DirectionalLight(0xffffff, 0);
            dirLight.color.setHSL(1, 1, 0.1);
            scene.add(dirLight);
        };
        Engine.prototype.initLights_mcl = function (camera, scene, renderer) {
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.physicallyCorrectLights = true;
            renderer.toneMappingExposure = 1;
            renderer.toneMappingWhitePoint = 1;
            scene.add(new THREE.AmbientLight(0xffffff, 2.5));
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
            scene.add(hemiLight);
            var dirLight = new THREE.DirectionalLight(0xffffff, 0.15);
            dirLight.position.set(0, 0, 3500);
            scene.add(dirLight);
            var u = new THREE.DirectionalLight(0xdddddd, 3);
            u.position.set(0, -1, 0).normalize();
            scene.add(u);
        };
        Engine.prototype.initLights = function (scene, camera, renderer) {
            this.initLights_bp3d(camera, scene, renderer);
            return;
        };
        Engine.prototype.initOthers = function () {
        };
        Engine.prototype.initBackground = function (scene) {
            var envMap = new THREE.CubeTextureLoader()
                .setPath('texture/cube/skybox/')
                .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
            envMap.format = THREE.RGBFormat;
            scene.background = envMap;
            this.ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(100000, 100000, 2, 2).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ visible: false, wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
            scene.add(this.ground);
            this.roof = this.ground.clone();
            this.roof.position.y = IMAPIC2D._DEFINES_.WALL.HEIGHT;
            scene.add(this.roof);
            this.grid = new THREE.GridHelper(1000, 100);
            scene.add(this.grid);
            return;
        };
        Engine.prototype.addItem = function (mesh, type) {
            type && (mesh.userData._type = type);
            if (type && type.search("WallEx") == 0) {
                this._houseGroup.add(mesh);
            }
            else {
                this._selectableGroup.add(mesh);
            }
        };
        Engine.prototype.addHouseItem = function (mesh, type) {
            this._houseGroup.add(mesh);
        };
        Engine.prototype.loadFrom2D = function (str, backFaceCulling) {
            this.clear();
            var scope = this;
            var generator = new IMAPIC3D.RoomGenerator(undefined, backFaceCulling);
            var data = JSON.parse(str);
            generator.setCallback(this.addItem.bind(this));
            if (data == null || !('walls' in data)) {
                return;
            }
            var inWallsJson = data['inWalls'];
            data['walls'].forEach(function (wall) {
                var _inWallsArray = [];
                IMAPIC3D.Item.pushIf(inWallsJson, _inWallsArray, function (item) {
                    return item['wallId'] == wall.id;
                });
                generator.generateWall(undefined, wall, _inWallsArray);
            });
            data['rooms'].forEach(function (room) {
                generator.generateRoom(room);
            });
            var init_pos = this._sceneCenter.clone().add(new THREE.Vector3(0, 170, 0));
            this._orbControls.target.copy(init_pos.clone().sub(new THREE.Vector3(0, 0, -10)));
        };
        Engine.prototype.clear = function () {
        };
        Engine.prototype.animate = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.animate(); });
            this.render();
        };
        Engine.prototype.render = function () {
            this._renderer.render(this._scene, this._camera);
        };
        Engine.prototype.disposeHouse = function () {
            IMAPIC3D.Item.dispose_House(this._scene);
        };
        Engine.prototype.traverseMesh = function (group, callback) {
            var arr = group.children;
            for (var i = 0; i < arr.length; i++) {
                var child = arr[i];
                if (child instanceof THREE.Mesh) {
                    callback(child);
                }
                else if (child instanceof THREE.Group) {
                    this.traverseMesh(child, callback);
                }
            }
        };
        Engine.prototype.setWireFrame = function (isWireFrame) {
            this.traverseMesh(this._scene, function (mesh) {
                mesh.material.wireframe = isWireFrame;
            });
        };
        return Engine;
    }());
    IMAPIC3D.Engine = Engine;
})(IMAPIC3D || (IMAPIC3D = {}));
