#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <algorithm>

void printGrid(std::vector<std::vector<char>> grid) {
    for(std::vector<char>& row : grid) {
        for(char& c : row) {
            std::cout << c;
        }
        std::cout << std::endl;
    }
}

std::vector<std::vector<char>> partOne(std::vector<std::vector<char>> grid) {
    unsigned long long res = 0U;
    unsigned long long rowIndex = 0U;

    while (rowIndex < grid.size() - 1) {
        for(std::size_t colIndex = 0U; colIndex < grid.at(rowIndex).size(); ++colIndex) {
            const char currentC = grid.at(rowIndex).at(colIndex);
            if (('S' == currentC) || ('|' == currentC)) {
                if ('.' == grid.at(rowIndex + 1).at(colIndex)) {
                    grid.at(rowIndex + 1).at(colIndex) = '|';
                } else if ('^' == grid.at(rowIndex + 1).at(colIndex)) {
                    ++res;
                    grid.at(rowIndex + 1).at(colIndex - 1) = '|';
                    grid.at(rowIndex + 1).at(colIndex + 1) = '|';
                }
            }
        }
        ++rowIndex;
    }

    std::cout << "    Result: " << res << std::endl;
    return grid;
}

typedef struct {
    unsigned long row;
    unsigned long col;
    unsigned long value;
} coordinate;

bool comp(coordinate c1, coordinate c2) {
    if (c1.row == c2.row) return c1.col < c2.col;
    return c1.row > c2.row;
}

unsigned long getSumOfBelow(coordinate& c, std::vector<coordinate>& coordinates) {
    unsigned long res = 0U;
    unsigned long leftRes = 0U;
    unsigned long rightRes = 0U;
    
    // find left
    for (long i = coordinates.size() - 1; i >= 0; --i) {
        if((coordinates.at(i).row > c.row) && (coordinates.at(i).col + 1 == c.col)) {
            leftRes = coordinates.at(i).value;
            break;
        }
    }
    if(0U == leftRes) ++res;
    else res += leftRes;
    
    // find right
    for (long i = coordinates.size() - 1; i >= 0; --i) {
        if((coordinates.at(i).row > c.row) && (coordinates.at(i).col - 1 == c.col)) {
            rightRes = coordinates.at(i).value;
            break;
        }
    }    
    if(0U == rightRes) ++res;
    else res += rightRes;
    return res;
}

void partTwo(std::vector<std::vector<char>> grid) {
    unsigned long long res = 0;
    bool reachedS = false;
    std::vector<coordinate> coordinates;
    
    for(unsigned long rowIndex = 0U; rowIndex < grid.size(); ++rowIndex) {
        for(unsigned long colIndex = 0U; colIndex < grid.at(rowIndex).size(); ++colIndex) {
            const char currentC = grid.at(rowIndex).at(colIndex);
            if ('^' == currentC) {
                coordinate c = {rowIndex, colIndex, 0U};
                coordinates.push_back(c);
            }
        }
        ++rowIndex;
    }
    
    std::sort(coordinates.begin(), coordinates.end(), comp);
    
    for(coordinate& c : coordinates) {
        if ((grid.size() - 2) == c.row) {
            c.value = 2;
        } else {
            c.value = getSumOfBelow(c, coordinates);
        }
    }
    

    std::cout << "    Result: " << coordinates.at(coordinates.size() - 1).value << std::endl;
}

int main() {
    std::ifstream file("input.txt");
    std::string line;
    std::vector<std::vector<char>> grid;

    while(std::getline(file, line)) {
        std::vector<char> row;
        for(char& c : line) {
            if(('.' != c) && ('^' != c) && ('S' != c)) continue;
            row.push_back(c);
        }
        grid.push_back(row);
    }

    std::cout << "Part One:\n";
    grid = partOne(grid);
    std::cout << "Part Two:\n";
    partTwo(grid);
    return 0;
}
