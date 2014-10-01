PGraphics pickbuffer = null;
int numCircles = 10;
MyCircle[] circles;

int bg_color = 1;

void setup() {
    smooth();
    size(600, 600);
    pickbuffer = createGraphics(width, height);

    circles = new MyCircle [numCircles];

    for (int i=0; i<numCircles; i++) {
        int radius = (int)random(10, 100);
        int posx = (int)random(radius, width-radius);
        int posy = (int)random(radius, height-radius);

        circles[i] = new MyCircle(bg_color, posx, posy, radius);
        bg_color++;

        int r = (int)random(0, 255);
        int g = (int)random(0, 255);
        int b = (int)random(0, 255);
        circles[i].setColor (r, g, b);    
    }
}

void draw () {
    background(255);

    for (int i=0; i<numCircles; i++) { 
        if (circles[i].getSelected() == true) {
            circles[i].renderSelected();
        } else {
            circles[i].render();
        }
    }

    if (keyPressed) {
        drawPickBuffer();
        image(pickbuffer, 0, 0);
    }
}

void drawPickBuffer() {
    for (int i = 0; i < numCircles; i++) {
        pickbuffer.beginDraw();
        circles[i].renderIsect(pickbuffer);
        pickbuffer.endDraw();
    }  
}

void mouseMoved () {
    drawPickBuffer();
    color curr_color = pickbuffer.get(mouseX, mouseY);
    
    for (int i=0; i<numCircles; i++) { 
        if (circles[i].isect(curr_color) == true) {
            circles[i].setSelected(true);
        }
        else {
            circles[i].setSelected(false);
        }
    }
}
class MyCircle {
  int id;
  int posx, posy, radius;
  int r, g, b;
  color pb_color;
  boolean selected = false;
  
  MyCircle(int _id, int _posx, int _posy, int _radius) {
    id = _id;
    posx = _posx;
    posy = _posy;
    radius = _radius;
    pb_color = color(id, id, id);

  }
  
  void setColor (int _r, int _g, int _b) {
    r = _r; g = _g; b = _b;
  }
  
  boolean getSelected () {
    return selected;
  }
  
  void setSelected (boolean _selected) {
    selected = _selected;
  }
  
  void render() {
    strokeWeight(5);
    stroke(r, g, b);
    noFill();
    ellipse(posx, posy, radius*2, radius*2);  
  }
  
  void renderIsect(PGraphics pg) {
    pg.fill(id, id, id);
    pg.stroke(id, id, id);
    pg.strokeWeight(5);
    pg.ellipse(posx, posy, radius*2, radius*2);  
    
  }
  
  void renderSelected() {
    strokeWeight(1);
    stroke(r, g, b);
    fill (r, g, b, 128);
    ellipse(posx, posy, radius*2, radius*2);      
  }
  
  boolean isect(int curr_color) {
    return (curr_color == pb_color);
  }


}
