#include <stdio.h>

int f (int var) {
    return var + 1;
}

int main (int argc, char ** argv) {
    int res = f(1);
    printf("Type check %d \n", res);
}