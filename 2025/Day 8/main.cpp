#include <iostream>
#include <string>
#include <fstream>
#include <cmath>
#include <vector>

typedef struct {
    unsigned long x;
    unsigned long y;
    unsigned long z;
} Point;

unsigned long distance(Point p1, Point p2) {
    return std::sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
}

void partOne(std::vector<Point> points) {

}

void partTwo(std::vector<Point> points) {
    
}

int main() {
    std::ifstream file("input1.txt");
    std::string line;
    std::vector<Point> points;
    while(std::getline(file, line)) {
        Point p;
        unsigned char position = line.find(',');
        std::string tempString = line.substr(0, position);
        line = line.substr(position);
        unsigned long tempVal = strtoul(tempString.c_str(), nullptr, 10);
        p.x = tempVal;
        position = line.find(',');
        tempString = line.substr(0, position);
        tempVal = strtoul(tempString.c_str(), nullptr, 10);
        p.y = tempVal;
        tempString = line.substr(position);
        tempVal = strtoul(tempString.c_str(), nullptr, 10);
        p.z = tempVal;
        points.push_back(p);
    }
    std::cout << "Part One:\n";
    partOne(p);
    std::cout << "Part Two:\n";
    partTwo(p);
    return 0;
}
