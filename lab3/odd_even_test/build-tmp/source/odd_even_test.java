import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class odd_even_test extends PApplet {

int numPoints = 20;
Point[] shape;

Point endP;

public void setup() {
    size(400, 400);
    smooth();
    shape = new Point[numPoints];
    endP = new Point();

    makeRandomShape();

    frame.setResizable(true);
}

public void draw() {
    background(255, 255, 255);
    stroke(0, 0, 0);

    drawShape();
    if (mousePressed == true) {
        stroke(255, 0, 0);
        line(mouseX, mouseY, endP.x, endP.y);
        println("drawing endx,y: " + endP.x + " " + endP.y);

        fill(0, 0, 0);
        boolean isect = isectTest();
        if (isect == true) {
            text("Inside", mouseX, mouseY);
        } else {
            text("Outside", mouseX, mouseY);
        }
    }
}

public void mousePressed() {
    endP.x = random(-1, 1) * 2 * width;
    endP.y = random(-1, 1) * 2 * height;
}

public void drawShape() {
    for (int i = 0; i < numPoints; i++) {
        int start = i;
        int end = (i + 1) % numPoints;

        line(shape[start].x + width/2.0f, 
             shape[start].y + height/2.0f,
             shape[end].x + width/2.0f, 
             shape[end].y + height/2.0f);
    }
}

public boolean isectTest() {
    Point mouse = new Point();
    Point end_point = new Point();

    mouse.x = mouseX - width/2.0f;
    mouse.y = mouseY - height/2.0f;
    end_point.x = endP.x - width/2.0f;
    end_point.y = endP.y - height/2.0f;

    int count = 0; 
    for (int i = 0; i < numPoints; i++) {
        int start = i;
        int end = (i + 1) % numPoints;

        if (lineIsect(mouse, end_point, shape[start], shape[end])) {
            count++;
        }
    }
    if (count % 2 == 0) {
        return false;
    } else {
        return true;
    } 
}

public boolean lineIsect(Point p1, Point q1, Point p2, Point q2) {
    float a1 = p1.y - q1.y;
    float b1 = q1.x - p1.x;
    float c1 = q1.x * p1.y - p1.x * q1.y;
    float a2 = p2.y - q2.y;
    float b2 = q2.x - p2.x;
    float c2 = q2.x * p2.y - p2.x * q2.y;
    float det = a1 * b2 - a2 * b1;
    if (isBetween(det, -0.001f, 0.001f)) {
        return false;
    } else {
        float isectx = (b2 * c1 - b1 * c2) / det;
        float isecty = (a1 * c2 - a2 * c1) / det;
        if ((isBetween(isecty, p1.y, q1.y) == true) &&
        (isBetween(isecty, p2.y, q2.y) == true) &&
        (isBetween(isectx, p1.x, q1.x) == true) &&
        (isBetween(isectx, p2.x, q2.x) == true)) {
            return true;
        }
    }
    return false;
}

public boolean isBetween(float val, float range1, float range2) {
    float largeNum = range1;
    float smallNum = range2;
    if (smallNum > largeNum) {
        largeNum = range2;
        smallNum = range1;
    }

    if ((val < largeNum) && (val > smallNum)) {
        return true;
    }
    return false;
}

public void makeRandomShape() {
    float slice = 360.0f / (float) numPoints;
    for (int i = 0; i < numPoints; i++) {
        float radius = (float) random(5, 100);
        shape[i] = new Point();
        shape[i].x = radius * cos(radians(slice * i));
        shape[i].y = radius * sin(radians(slice * i));
    }
}
class Point {
    public float x;
    public float y;
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "odd_even_test" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
