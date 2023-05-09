"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseById = exports.getAllCourses = void 0;
const fetchData_1 = require("../utils/fetchData");
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationParams = req.query;
        const response = yield (0, fetchData_1.fetchAllCourses)(paginationParams);
        if (response.error) {
            throw new Error(response.error);
        }
        const { courses, allCoursesLength } = response;
        res.status(200).json({ courses, allCoursesLength });
    }
    catch (e) {
        next(e);
    }
});
exports.getAllCourses = getAllCourses;
const getCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield (0, fetchData_1.fetchCourse)(courseId);
        if (course.error) {
            throw new Error(course.error);
        }
        res.status(200).json(course);
    }
    catch (e) {
        next(e);
    }
});
exports.getCourseById = getCourseById;
