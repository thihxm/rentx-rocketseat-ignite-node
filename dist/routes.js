"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(req, res) {
    CreateCourseService_1.default.execute({
        name: "NodeJS",
        duration: 10,
        instructor: "Thiago"
    });
    CreateCourseService_1.default.execute({
        name: "ReactJS",
        instructor: "Bruna"
    });
    return res.send();
}
exports.createCourse = createCourse;
