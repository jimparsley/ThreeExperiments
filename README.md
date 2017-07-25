This repository contains my experiments with the Web GL wrapper three.js.

I'm particularly interested in 3D fractals, and I'm aiming to create a gallery to display some nicely rendered examples. I will focus on iterated function systems to start with. The nice thing about these is that you can create interesting objects after only a few iterations, which means that the code to build the object can be written in javascript and run in a web browser. It only takes a few seconds to create the object.

I might alse create some animations to illustrate how they are formed. Since each iteration involves applying a set of affine transformations to the result of the previous iteration, it should be possible to create an animation of the effect of applying each transformation.
