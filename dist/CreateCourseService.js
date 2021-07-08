"use strict";
/**
 * name - string
 * duration - number
 * instructor - string
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    CreateCourseService.prototype.execute = function (_a) {
        var _b = _a.duration, duration = _b === void 0 ? 8 : _b, name = _a.name, instructor = _a.instructor;
        console.log(name, duration, instructor);
    };
    return CreateCourseService;
}());
exports.default = new CreateCourseService();
