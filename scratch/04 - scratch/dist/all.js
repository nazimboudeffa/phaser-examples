/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @module PIXI
 */
var PIXI = PIXI || {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

(function(){

	var root = this;



/*
 * A lighter version of the rad gl-matrix created by Brandon Jones, Colin MacKenzie IV
 * you both rock!
 */

function determineMatrixArrayType() {
    PIXI.Matrix = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
    return PIXI.Matrix;
}

determineMatrixArrayType();

PIXI.mat3 = {};

PIXI.mat3.create = function()
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;
	
	return matrix;
}


PIXI.mat3.identity = function(matrix)
{
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;
	
	return matrix;
}


PIXI.mat4 = {};

PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat3.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2],
	    a10 = mat[3], a11 = mat[4], a12 = mat[5],
	    a20 = mat[6], a21 = mat[7], a22 = mat[8],
	
	    b00 = mat2[0], b01 = mat2[1], b02 = mat2[2],
	    b10 = mat2[3], b11 = mat2[4], b12 = mat2[5],
	    b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
	
	dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
	dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
	dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
	
	dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
	dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
	dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
	
	dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
	dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
	dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
	
	return dest;
}

PIXI.mat3.clone = function(mat)
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = mat[0];
	matrix[1] = mat[1];
	matrix[2] = mat[2];
	matrix[3] = mat[3];
	matrix[4] = mat[4];
	matrix[5] = mat[5];
	matrix[6] = mat[6];
	matrix[7] = mat[7];
	matrix[8] = mat[8];
	
	return matrix;
}

PIXI.mat3.transpose = function (mat, dest) 
{
 	// If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!dest || mat === dest) {
        var a01 = mat[1], a02 = mat[2],
            a12 = mat[5];

        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
        return mat;
    }

    dest[0] = mat[0];
    dest[1] = mat[3];
    dest[2] = mat[6];
    dest[3] = mat[1];
    dest[4] = mat[4];
    dest[5] = mat[7];
    dest[6] = mat[2];
    dest[7] = mat[5];
    dest[8] = mat[8];
    return dest;
}

PIXI.mat3.toMat4 = function (mat, dest) 
{
	if (!dest) { dest = PIXI.mat4.create(); }
	
	dest[15] = 1;
	dest[14] = 0;
	dest[13] = 0;
	dest[12] = 0;
	
	dest[11] = 0;
	dest[10] = mat[8];
	dest[9] = mat[7];
	dest[8] = mat[6];
	
	dest[7] = 0;
	dest[6] = mat[5];
	dest[5] = mat[4];
	dest[4] = mat[3];
	
	dest[3] = 0;
	dest[2] = mat[2];
	dest[1] = mat[1];
	dest[0] = mat[0];
	
	return dest;
}


/////


PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat4.transpose = function (mat, dest) 
{
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if (!dest || mat === dest) 
	{
	    var a01 = mat[1], a02 = mat[2], a03 = mat[3],
	        a12 = mat[6], a13 = mat[7],
	        a23 = mat[11];
	
	    mat[1] = mat[4];
	    mat[2] = mat[8];
	    mat[3] = mat[12];
	    mat[4] = a01;
	    mat[6] = mat[9];
	    mat[7] = mat[13];
	    mat[8] = a02;
	    mat[9] = a12;
	    mat[11] = mat[14];
	    mat[12] = a03;
	    mat[13] = a13;
	    mat[14] = a23;
	    return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
}

PIXI.mat4.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
	var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
	var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	// Cache only the current line of the second matrix
    var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];  
    dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[4];
    b1 = mat2[5];
    b2 = mat2[6];
    b3 = mat2[7];
    dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[8];
    b1 = mat2[9];
    b2 = mat2[10];
    b3 = mat2[11];
    dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[12];
    b1 = mat2[13];
    b2 = mat2[14];
    b3 = mat2[15];
    dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    return dest;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 *
 * @class Point
 * @constructor 
 * @param x {number} position of the point
 * @param y {number} position of the point
 */
PIXI.Point = function(x, y)
{
	/**
	 * @property x 
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
}

/**
 * Creates a clone of this point
 *
 * @method clone
 * @return {Point} a copy of the point
 */
PIXI.Point.prototype.clone = function()
{
	return new PIXI.Point(this.x, this.y);
}

// constructor
PIXI.Point.prototype.constructor = PIXI.Point;


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 *
 * @class Rectangle
 * @constructor 
 * @param x {number} The X coord of the upper-left corner of the rectangle
 * @param y {number} The Y coord of the upper-left corner of the rectangle
 * @param width {number} The overall wisth of this rectangle
 * @param height {number} The overall height of this rectangle
 */
PIXI.Rectangle = function(x, y, width, height)
{
	/**
	 * @property x
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
	
	/**
	 * @property width
	 * @type Number
	 * @default 0
	 */
	this.width = width || 0;
	
	/**
	 * @property height
	 * @type Number
	 * @default 0
	 */
	this.height = height || 0;
}

/**
 * Creates a clone of this Rectangle
 *
 * @method clone
 * @return {Rectangle} a copy of the rectangle
 */
PIXI.Rectangle.prototype.clone = function()
{
	return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this Rectangle
 *
 * @method contains
 * @param x {number} The X coord of the point to test
 * @param y {number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this Rectangle
 */
PIXI.Rectangle.prototype.contains = function(x, y)
{
    if(this.width <= 0 || this.height <= 0)
        return false;

	var x1 = this.x;
	if(x >= x1 && x <= x1 + this.width)
	{
		var y1 = this.y;
		
		if(y >= y1 && y <= y1 + this.height)
		{
			return true;
		}
	}

	return false;
}

// constructor
PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The base class for all objects that are rendered on the screen.
 *
 * @class DisplayObject
 * @constructor
 */
PIXI.DisplayObject = function()
{
	this.last = this;
	this.first = this;

	/**
	 * The coordinate of the object relative to the local coordinates of the parent.
	 *
	 * @property position
	 * @type Point
	 */
	this.position = new PIXI.Point();

	/**
	 * The scale factor of the object.
	 *
	 * @property scale
	 * @type Point
	 */
	this.scale = new PIXI.Point(1,1);//{x:1, y:1};

	/**
	 * The pivot point of the displayObject that it rotates around
	 *
	 * @property pivot
	 * @type Point
	 */
	this.pivot = new PIXI.Point(0,0);

	/**
	 * The rotation of the object in radians.
	 *
	 * @property rotation
	 * @type Number
	 */
	this.rotation = 0;

	/**
	 * The opacity of the object.
	 *
	 * @property alpha
	 * @type Number
	 */	
	this.alpha = 1;

	/**
	 * The visibility of the object.
	 *
	 * @property visible
	 * @type Boolean
	 */	
	this.visible = true;

	/**
	 * This is the defined area that will pick up mouse / touch events. It is null by default.
	 * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
	 *
	 * @property hitArea
	 * @type Rectangle|Circle|Ellipse|Polygon
	 */	
	this.hitArea = null;

	/**
	 * This is used to indicate if the displayObject should display a mouse hand cursor on rollover
	 *
	 * @property buttonMode
	 * @type Boolean
	 */
	this.buttonMode = false;

	/**
	 * Can this object be rendered
	 *
	 * @property renderable
	 * @type Boolean
	 */
	this.renderable = false;

	/**
	 * [read-only] The display object container that contains this display object.
	 *
	 * @property parent
	 * @type DisplayObjectContainer
	 * @readOnly
	 */	
	this.parent = null;

	/**
	 * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
	 *
	 * @property stage
	 * @type Stage
	 * @readOnly
	 */	
	this.stage = null;

	/**
	 * [read-only] The multiplied alpha of the displayobject
	 *
	 * @property worldAlpha
	 * @type Number
	 * @readOnly
	 */
	this.worldAlpha = 1;

	/**
	 * [read-only] Whether or not the object is interactive, do not toggle directly! use the `interactive` property
	 *
	 * @property _interactive
	 * @type Boolean
	 * @readOnly
	 * @private
	 */
	this._interactive = false;

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [read-only] Current transform of the object locally
	 *
	 * @property localTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.localTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [NYI] Unkown
	 *
	 * @property color
	 * @type Array<>
	 * @private
	 */
	this.color = [];

	/**
	 * [NYI] Holds whether or not this object is dynamic, for rendering optimization
	 *
	 * @property dynamic
	 * @type Boolean
	 * @private
	 */
	this.dynamic = true;

	// chach that puppy!
	this._sr = 0;
	this._cr = 1;

	/*
	 * MOUSE Callbacks
	 */

	/**
	 * A callback that is used when the users clicks on the displayObject with their mouse
	 * @method click
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user clicks the mouse down over the sprite
	 * @method mousedown
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject
	 * for this callback to be fired the mouse must have been pressed down over the displayObject
	 * @method mouseup
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
	 * for this callback to be fired, The touch must have started over the displayObject
	 * @method mouseupoutside
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the users mouse rolls over the displayObject
	 * @method mouseover
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the users mouse leaves the displayObject
	 * @method mouseout
	 * @param interactionData {InteractionData}
	 */


	/*
	 * TOUCH Callbacks
	 */

	/**
	 * A callback that is used when the users taps on the sprite with their finger
	 * basically a touch version of click
	 * @method tap
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user touch's over the displayObject
	 * @method touchstart
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases a touch over the displayObject
	 * @method touchend
	 * @param interactionData {InteractionData}
	 */

	/**
	 * A callback that is used when the user releases the touch that was over the displayObject
	 * for this callback to be fired, The touch must have started over the sprite
	 * @method touchendoutside
	 * @param interactionData {InteractionData}
	 */
}

// constructor
PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;

/**
 * [Deprecated] Indicates if the sprite will have touch and mouse interactivity. It is false by default
 * Instead of using this function you can now simply set the interactive property to true or false
 *
 * @method setInteractive
 * @param interactive {Boolean}
 * @deprecated Simply set the `interactive` property directly
 */
PIXI.DisplayObject.prototype.setInteractive = function(interactive)
{
	this.interactive = interactive;
}

/**
 * Indicates if the sprite will have touch and mouse interactivity. It is false by default
 *
 * @property interactive
 * @type Boolean
 * @default false
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'interactive', {
    get: function() {
        return this._interactive;
    },
    set: function(value) {
    	this._interactive = value;
    	
    	// TODO more to be done here..
		// need to sort out a re-crawl!
		if(this.stage)this.stage.dirty = true;
    }
});

/**
 * Sets a mask for the displayObject. A mask is an object that limits the visibility of an object to the shape of the mask applied to it.
 * In PIXI a regular mask must be a PIXI.Ggraphics object. This allows for much faster masking in canvas as it utilises shape clipping.
 * To remove a mask, set this property to null.
 *
 * @property mask
 * @type Graphics
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'mask', {
    get: function() {
        return this._mask;
    },
    set: function(value) {
    	
        this._mask = value;
        
        if(value)
        {
	        this.addFilter(value)
        }
        else
        {
        	 this.removeFilter();
        }
    }
});

/*
 * Adds a filter to this displayObject
 *
 * @method addFilter
 * @param mask {Graphics} the graphics object to use as a filter
 * @private
 */
PIXI.DisplayObject.prototype.addFilter = function(mask)
{
	if(this.filter)return;
	this.filter = true;
	
	// insert a filter block..
	var start = new PIXI.FilterBlock();
	var end = new PIXI.FilterBlock();
	
	start.mask = mask;
	end.mask = mask;
	
	start.first = start.last =  this;
	end.first = end.last = this;
	
	start.open = true;
	
	/*
	 * insert start
	 */
	
	var childFirst = start
	var childLast = start
	var nextObject;
	var previousObject;
		
	previousObject = this.first._iPrev;
	
	if(previousObject)
	{
		nextObject = previousObject._iNext;
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		
	}
	else
	{
		nextObject = this;
	}	
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	
	// now insert the end filter block..
	
	/*
	 * insert end filter
	 */
	var childFirst = end
	var childLast = end
	var nextObject = null;
	var previousObject = null;
		
	previousObject = this.last;
	nextObject = previousObject._iNext;
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;	
	
	var updateLast = this;
	
	var prevLast = this.last;
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = end;
		}
		updateLast = updateLast.parent;
	}
	
	this.first = start;
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.addFilterBlocks(start, end);
	}
	
	mask.renderable = false;
	
}

/*
 * Removes the filter to this displayObject
 *
 * @method removeFilter
 * @private
 */
PIXI.DisplayObject.prototype.removeFilter = function()
{
	if(!this.filter)return;
	this.filter = false;
	
	// modify the list..
	var startBlock = this.first;
	
	var nextObject = startBlock._iNext;
	var previousObject = startBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	if(previousObject)previousObject._iNext = nextObject;		
	
	this.first = startBlock._iNext;
	
	
	// remove the end filter
	var lastBlock = this.last;
	
	var nextObject = lastBlock._iNext;
	var previousObject = lastBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	previousObject._iNext = nextObject;		
	
	// this is always true too!
	var tempLast =  lastBlock._iPrev;	
	// need to make sure the parents last is updated too
	var updateLast = this;
	while(updateLast.last == lastBlock)
	{
		updateLast.last = tempLast;
		updateLast = updateLast.parent;
		if(!updateLast)break;
	}
	
	var mask = startBlock.mask
	mask.renderable = true;
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.removeFilterBlocks(startBlock, lastBlock);
	}
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
	// TODO OPTIMIZE THIS!! with dirty
	if(this.rotation !== this.rotationCache)
	{
		this.rotationCache = this.rotation;
		this._sr =  Math.sin(this.rotation);
		this._cr =  Math.cos(this.rotation);
	}	
	
	var localTransform = this.localTransform;
	var parentTransform = this.parent.worldTransform;
	var worldTransform = this.worldTransform;
	//console.log(localTransform)
	localTransform[0] = this._cr * this.scale.x;
	localTransform[1] = -this._sr * this.scale.y
	localTransform[3] = this._sr * this.scale.x;
	localTransform[4] = this._cr * this.scale.y;
	
	// TODO --> do we even need a local matrix???
	
	var px = this.pivot.x;
	var py = this.pivot.y;
   	
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = localTransform[0], a01 = localTransform[1], a02 = this.position.x - localTransform[0] * px - py * localTransform[1],
        a10 = localTransform[3], a11 = localTransform[4], a12 = this.position.y - localTransform[4] * py - px * localTransform[3],

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

	localTransform[2] = a02
	localTransform[5] = a12
	
    worldTransform[0] = b00 * a00 + b01 * a10;
    worldTransform[1] = b00 * a01 + b01 * a11;
    worldTransform[2] = b00 * a02 + b01 * a12 + b02;

    worldTransform[3] = b10 * a00 + b11 * a10;
    worldTransform[4] = b10 * a01 + b11 * a11;
    worldTransform[5] = b10 * a02 + b11 * a12 + b12;

	// because we are using affine transformation, we can optimise the matrix concatenation process.. wooo!
	// mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
	this.worldAlpha = this.alpha * this.parent.worldAlpha;
	
	this.vcount = PIXI.visibleCount;

}

PIXI.visibleCount = 0;
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects.
 * It is the base class of all display objects that act as a container for other objects.
 *
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function()
{
	PIXI.DisplayObject.call( this );
	
	/**
	 * [read-only] The of children of this container.
	 *
	 * @property children
	 * @type Array<DisplayObject>
	 * @readOnly
	 */	
	this.children = [];
}

// constructor
PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;

//TODO make visible a getter setter
/*
Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'visible', {
    get: function() {
        return this._visible;
    },
    set: function(value) {
        this._visible = value;
        
    }
});*/

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param child {DisplayObject} The DisplayObject to add to the container
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		
		//// COULD BE THIS???
		child.parent.removeChild(child);
	//	return;
	}

	child.parent = this;
	
	this.children.push(child);	
	
	// update the stage refference..
	
	if(this.stage)
	{
		var tmpChild = child;
		do
		{
			if(tmpChild.interactive)this.stage.dirty = true;
			tmpChild.stage = this.stage;
			tmpChild = tmpChild._iNext;
		}	
		while(tmpChild)
	}
	
	// LINKED LIST //
	
	// modify the list..
	var childFirst = child.first
	var childLast = child.last;
	var nextObject;
	var previousObject;
	
	// this could be wrong if there is a filter??
	if(this.filter)
	{
		previousObject =  this.last._iPrev;
	}
	else
	{
		previousObject = this.last;
	}

	nextObject = previousObject._iNext;
	
	// always true in this case
	// need to make sure the parents last is updated too
	var updateLast = this;
	var prevLast = previousObject;
	
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = child.last;
		}
		updateLast = updateLast.parent;
	}
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;		

	// need to remove any render groups..
	if(this.__renderGroup)
	{
		// being used by a renderTexture.. if it exists then it must be from a render texture;
		if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
		// add them to the new render group..
		this.__renderGroup.addDisplayObjectAndChildren(child);
	}
	
}

/**
 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
 *
 * @method addChildAt
 * @param child {DisplayObject} The child to add
 * @param index {number} The index to place the child in
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(index >= 0 && index <= this.children.length)
	{
		if(child.parent != undefined)
		{
			child.parent.removeChild(child);
		}
		child.parent = this;
		
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = this.stage;
				tmpChild = tmpChild._iNext;
			}
			while(tmpChild)
		}
		
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		var nextObject;
		var previousObject;
		
		if(index == this.children.length)
		{
			previousObject =  this.last;
			var updateLast = this;
			var prevLast = this.last;
			while(updateLast)
			{
				if(updateLast.last == prevLast)
				{
					updateLast.last = child.last;
				}
				updateLast = updateLast.parent;
			}
		}
		else if(index == 0)
		{
			previousObject = this;
		}
		else
		{
			previousObject = this.children[index-1].last;
		}
		
		nextObject = previousObject._iNext;
		
		// always true in this case
		if(nextObject)
		{
			nextObject._iPrev = childLast;
			childLast._iNext = nextObject;
		}
		
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		

		this.children.splice(index, 0, child);
		// need to remove any render groups..
		if(this.__renderGroup)
		{
			// being used by a renderTexture.. if it exists then it must be from a render texture;
			if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
			// add them to the new render group..
			this.__renderGroup.addDisplayObjectAndChildren(child);
		}
		
	}
	else
	{
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
	}
}

/**
 * [NYI] Swaps the depth of 2 displayObjects
 *
 * @method swapChildren
 * @param child {DisplayObject}
 * @param child2 {DisplayObject}
 * @private
 */
PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
{
	/*
	 * this funtion needs to be recoded.. 
	 * can be done a lot faster..
	 */
	return;
	
	// need to fix this function :/
	/*
	// TODO I already know this??
	var index = this.children.indexOf( child );
	var index2 = this.children.indexOf( child2 );
	
	if ( index !== -1 && index2 !== -1 ) 
	{
		// cool
		
		/*
		if(this.stage)
		{
			// this is to satisfy the webGL batching..
			// TODO sure there is a nicer way to achieve this!
			this.stage.__removeChild(child);
			this.stage.__removeChild(child2);
			
			this.stage.__addChild(child);
			this.stage.__addChild(child2);
		}
		
		// swap the positions..
		this.children[index] = child2;
		this.children[index2] = child;
		
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}*/
}

/**
 * Returns the Child at the specified index
 *
 * @method getChildAt
 * @param index {number} The index to get the child from
 */
PIXI.DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if(index >= 0 && index < this.children.length)
	{
		return this.children[index];
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}
}

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param child {DisplayObject} The DisplayObject to remove
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
{
	var index = this.children.indexOf( child );
	if ( index !== -1 ) 
	{
		// unlink //
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		
		var nextObject = childLast._iNext;
		var previousObject = childFirst._iPrev;
			
		if(nextObject)nextObject._iPrev = previousObject;
		previousObject._iNext = nextObject;		
		
		if(this.last == childLast)
		{
			var tempLast =  childFirst._iPrev;	
			// need to make sure the parents last is updated too
			var updateLast = this;
			while(updateLast.last == childLast.last)
			{
				updateLast.last = tempLast;
				updateLast = updateLast.parent;
				if(!updateLast)break;
			}
		}
		
		childLast._iNext = null;
		childFirst._iPrev = null;
		 
		// update the stage reference..
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = null;
				tmpChild = tmpChild._iNext;
			}	
			while(tmpChild)
		}
	
		// webGL trim
		if(child.__renderGroup)
		{
			child.__renderGroup.removeDisplayObjectAndChildren(child);
		}
		
		child.parent = undefined;
		this.children.splice( index, 1 );
	}
	else
	{
		throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
	}
}

/*
 * Updates the container's children's transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObjectContainer.prototype.updateTransform = function()
{
	if(!this.visible)return;
	
	PIXI.DisplayObject.prototype.updateTransform.call( this );
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;


/**
 * The SPrite object is the base for all textured objects that are rendered to the screen
 *
 * @class Sprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} The texture for this sprite
 * @type String
 */
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
	 *
     * @property anchor
     * @type Point
     */
	this.anchor = new PIXI.Point();

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;

	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 *
	 * @property blendMode
	 * @type Number
	 */
	this.blendMode = PIXI.blendModes.NORMAL;

	/**
	 * The width of the sprite (this is initially set by the texture)
	 *
	 * @property _width
	 * @type Number
	 * @private
	 */
	this._width = 0;

	/**
	 * The height of the sprite (this is initially set by the texture)
	 *
	 * @property _height
	 * @type Number
	 * @private
	 */
	this._height = 0;

	if(texture.baseTexture.hasLoaded)
	{
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}

	this.renderable = true;
}

// constructor
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Sprite.prototype.constructor = PIXI.Sprite;

/**
 * The width of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.Sprite.prototype, 'width', {
    get: function() {
        return this.scale.x * this.texture.frame.width;
    },
    set: function(value) {
    	this.scale.x = value / this.texture.frame.width
        this._width = value;
    }
});

/**
 * The height of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(PIXI.Sprite.prototype, 'height', {
    get: function() {
        return  this.scale.y * this.texture.frame.height;
    },
    set: function(value) {
    	this.scale.y = value / this.texture.frame.height
        this._height = value;
    }
});

/**
 * Sets the texture of the sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.Sprite.prototype.setTexture = function(texture)
{
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
		this.texture = texture;
		
		if(this.__renderGroup)
		{
			this.__renderGroup.updateTexture(this);
		}
	}
	else
	{
		this.texture = texture;
	}
	
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the scale and frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	//this.texture.removeEventListener( 'update', this.onTextureUpdateBind );

	// so if _width is 0 then width was not set..
	if(this._width)this.scale.x = this._width / this.texture.frame.width;
	if(this._height)this.scale.y = this._height / this.texture.frame.height;
	
	this.updateFrame = true;
}

// some helper functions..

/**
 * 
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
 * The frame ids are created when a Texture packer file has been loaded
 *
 * @method fromFrame
 * @static
 * @param frameId {String} The frame Id of the texture in the cache
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the frameId
 */
PIXI.Sprite.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache" + this);
	return new PIXI.Sprite(texture);
}

/**
 * 
 * Helper function that creates a sprite that will contain a texture based on an image url
 * If the image is not in the texture cache it will be loaded
 *
 * @method fromImage
 * @static
 * @param imageId {String} The image url of the texture
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the image id
 */
PIXI.Sprite.fromImage = function(imageId)
{
	var texture = PIXI.Texture.fromImage(imageId);
	return new PIXI.Sprite(texture);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Stage represents the root of the display tree. Everything connected to the stage is rendered
 *
 * @class Stage
 * @extends DisplayObjectContainer
 * @constructor
 * @param backgroundColor {number} the background color of the stage, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
 * @param interactive {Boolean} enable / disable interaction (default is false)
 */
PIXI.Stage = function(backgroundColor, interactive)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create();

	/**
	 * Whether or not the stage is interactive
	 *
	 * @property interactive
	 * @type Boolean
	 */
	this.interactive = interactive;

	/**
	 * The interaction manage for this stage, manages all interactive activity on the stage
	 *
	 * @property interactive
	 * @type InteractionManager
	 */
	this.interactionManager = new PIXI.InteractionManager(this);

	/**
	 * Whether the stage is dirty and needs to have interactions updated
	 *
	 * @property dirty
	 * @type Boolean
	 * @private
	 */
	this.dirty = true;

	this.__childrenAdded = [];
	this.__childrenRemoved = [];

	//the stage is it's own stage
	this.stage = this;

	//optimize hit detection a bit
	this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);

	this.setBackgroundColor(backgroundColor);
	this.worldVisible = true;

}

// constructor
PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Stage.prototype.constructor = PIXI.Stage;

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Stage.prototype.updateTransform = function()
{
	this.worldAlpha = 1;
	this.vcount = PIXI.visibleCount;

	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();
	}

	if(this.dirty)
	{
		this.dirty = false;
		// update interactive!
		this.interactionManager.dirty = true;
	}


	if(this.interactive)this.interactionManager.update();
}

/**
 * Sets the background color for the stage
 *
 * @method setBackgroundColor
 * @param backgroundColor {number} the color of the background, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
 */
PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
	this.backgroundColor = backgroundColor || 0x000000;
	this.backgroundColorSplit = HEXtoRGB(this.backgroundColor);
	var hex = this.backgroundColor.toString(16);
	hex = "000000".substr(0, 6 - hex.length) + hex;
	this.backgroundColorString = "#" + hex;
}

/**
 * This will return the point containing global coords of the mouse.
 *
 * @method getMousePosition
 * @return {Point} The point containing the coords of the global InteractionData position.
 */
PIXI.Stage.prototype.getMousePosition = function()
{
	return this.interactionManager.mouse.global;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * This object is one that will allow you to specify custom rendering functions based on render type
 *
 * @class CustomRenderable 
 * @extends DisplayObject
 * @constructor
 */
PIXI.CustomRenderable = function()
{
	PIXI.DisplayObject.call( this );
	
}

// constructor
PIXI.CustomRenderable.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.CustomRenderable.prototype.constructor = PIXI.CustomRenderable;

/**
 * If this object is being rendered by a CanvasRenderer it will call this callback
 *
 * @method renderCanvas
 * @param renderer {CanvasRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.renderCanvas = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback to initialize
 *
 * @method initWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.initWebGL = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback
 *
 * @method renderWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.renderWebGL = function(renderGroup, projectionMatrix)
{
	// not sure if both needed? but ya have for now!
	// override!
}


/**
 * @author Mat Groves http://matgroves.com/
 */

PIXI.Strip = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );
	this.texture = texture;
	this.blendMode = PIXI.blendModes.NORMAL;
	
	try
	{
		this.uvs = new Float32Array([0, 1,
				1, 1,
				1, 0, 0,1]);
	
		this.verticies = new Float32Array([0, 0,
						  0,0,
						  0,0, 0,
						  0, 0]);
						  
		this.colors = new Float32Array([1, 1, 1, 1]);
		
		this.indices = new Uint16Array([0, 1, 2, 3]);
	}
	catch(error)
	{
		this.uvs = [0, 1,
				1, 1,
				1, 0, 0,1];
	
		this.verticies = [0, 0,
						  0,0,
						  0,0, 0,
						  0, 0];
						  
		this.colors = [1, 1, 1, 1];
		
		this.indices = [0, 1, 2, 3];
	}
	
	
	/*
	this.uvs = new Float32Array()
	this.verticies = new Float32Array()
	this.colors = new Float32Array()
	this.indices = new Uint16Array()
*/
	this.width = width;
	this.height = height;
	
	// load the texture!
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
}

// constructor
PIXI.Strip.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Strip.prototype.constructor = PIXI.Strip;

PIXI.Strip.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

PIXI.Strip.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}
// some helper functions..


/**
 * @author Mat Groves http://matgroves.com/
 */


PIXI.Rope = function(texture, points)
{
	PIXI.Strip.call( this, texture );
	this.points = points;
	
	try
	{
		this.verticies = new Float32Array( points.length * 4);
		this.uvs = new Float32Array( points.length * 4);
		this.colors = new Float32Array(  points.length * 2);
		this.indices = new Uint16Array( points.length * 2);
	}
	catch(error)
	{
		this.verticies = verticies
		
		this.uvs = uvs
		this.colors = colors
		this.indices = indices
	}
	
	this.refresh();
}


// constructor
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );
PIXI.Rope.prototype.constructor = PIXI.Rope;

PIXI.Rope.prototype.refresh = function()
{
	var points = this.points;
	if(points.length < 1)return;
	
	var uvs = this.uvs
	var indices = this.indices;
	var colors = this.colors;
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	
	uvs[0] = 0
	uvs[1] = 1
	uvs[2] = 0
	uvs[3] = 1
	
	colors[0] = 1;
	colors[1] = 1;
	
	indices[0] = 0;
	indices[1] = 1;
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		// time to do some smart drawing!
		var amount = i/(total-1)
		
		if(i%2)
		{
			uvs[index] = amount;
			uvs[index+1] = 0;
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		
		}
		else
		{
			uvs[index] = amount
			uvs[index+1] = 0
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		}
		
		index = i * 2;
		colors[index] = 1;
		colors[index+1] = 1;
		
		index = i * 2;
		indices[index] = index;
		indices[index + 1] = index + 1;
		
		lastPoint = point;
	}
}

PIXI.Rope.prototype.updateTransform = function()
{
	
	var points = this.points;
	if(points.length < 1)return;
	
	var verticies = this.verticies 
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	verticies[0] = point.x + perp.x 
	verticies[1] = point.y + perp.y //+ 200
	verticies[2] = point.x - perp.x 
	verticies[3] = point.y - perp.y//+200
	// time to do some smart drawing!
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		
		if(i < points.length-1)
		{
			nextPoint = points[i+1];
		}
		else
		{
			nextPoint = point
		}
		
		perp.y = -(nextPoint.x - lastPoint.x);
		perp.x = nextPoint.y - lastPoint.y;
		
		var ratio = (1 - (i / (total-1))) * 10;
				if(ratio > 1)ratio = 1;
				
		var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
		var num = this.texture.height/2//(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
		perp.x /= perpLength;
		perp.y /= perpLength;
	
		perp.x *= num;
		perp.y *= num;
		
		verticies[index] = point.x + perp.x 
		verticies[index+1] = point.y + perp.y
		verticies[index+2] = point.x - perp.x 
		verticies[index+3] = point.y - perp.y

		lastPoint = point;
	}
	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

PIXI.Rope.prototype.setTexture = function(texture)
{
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}





/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 * @class TilingSprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {number}  the width of the tiling sprite
 * @param height {number} the height of the tiling sprite
 */
PIXI.TilingSprite = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;

	/**
	 * The width of the tiling sprite
	 *
	 * @property width
	 * @type Number
	 */
	this.width = width;

	/**
	 * The height of the tiling sprite
	 *
	 * @property height
	 * @type Number
	 */
	this.height = height;

	/**
	 * The scaling of the image that is being tiled
	 *
	 * @property tileScale
	 * @type Point
	 */	
	this.tileScale = new PIXI.Point(1,1);

	/**
	 * The offset position of the image that is being tiled
	 *
	 * @property tilePosition
	 * @type Point
	 */	
	this.tilePosition = new PIXI.Point(0,0);

	this.renderable = true;
	
	this.blendMode = PIXI.blendModes.NORMAL
}

// constructor
PIXI.TilingSprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;

/**
 * Sets the texture of the tiling sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.TilingSprite.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */
PIXI.TilingSprite.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



PIXI.FilterBlock = function(mask)
{
	this.graphics = mask
	this.visible = true;
	this.renderable = true;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



PIXI.MaskFilter = function(graphics)
{
	// the graphics data that will be used for filtering
	this.graphics;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * The Graphics class contains a set of methods that you can use to create primitive shapes and lines. 
 * It is important to know that with the webGL renderer only simple polys can be filled at this stage
 * Complex polys will not be filled. Heres an example of a complex poly: http://www.goodboydigital.com/wp-content/uploads/2013/06/complexPolygon.png
 *
 * @class Graphics 
 * @extends DisplayObjectContainer
 * @constructor
 */
PIXI.Graphics = function()
{
	PIXI.DisplayObjectContainer.call( this );
	
	this.renderable = true;

    /**
     * The alpha of the fill of this graphics object
     *
     * @property fillAlpha
     * @type Number
     */
	this.fillAlpha = 1;

    /**
     * The width of any lines drawn
     *
     * @property lineWidth
     * @type Number
     */
	this.lineWidth = 0;

    /**
     * The color of any lines drawn
     *
     * @property lineColor
     * @type String
     */
	this.lineColor = "black";

    /**
     * Graphics data
     *
     * @property graphicsData
     * @type Array
     * @private
     */
	this.graphicsData = [];

    /**
     * Current path
     *
     * @property currentPath
     * @type Object
     * @private
     */
	this.currentPath = {points:[]};
}

// constructor
PIXI.Graphics.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Graphics.prototype.constructor = PIXI.Graphics;

/**
 * Specifies a line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
 *
 * @method lineStyle
 * @param lineWidth {number} width of the line to draw, will update the object's stored style
 * @param color {number} color of the line to draw, will update the object's stored style
 * @param alpha {number} alpha of the line to draw, will update the object's stored style
 */
PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.lineWidth = lineWidth || 0;
	this.lineColor = color || 0;
	this.lineAlpha = (alpha == undefined) ? 1 : alpha;
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};
	
	this.graphicsData.push(this.currentPath);
}

/**
 * Moves the current drawing position to (x, y).
 *
 * @method moveTo
 * @param x {number} the X coord to move to
 * @param y {number} the Y coord to move to
 */
PIXI.Graphics.prototype.moveTo = function(x, y)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};
	
	this.currentPath.points.push(x, y);
	
	this.graphicsData.push(this.currentPath);
}

/**
 * Draws a line using the current line style from the current drawing position to (x, y);
 * the current drawing position is then set to (x, y).
 *
 * @method lineTo
 * @param x {number} the X coord to draw to
 * @param y {number} the Y coord to draw to
 */
PIXI.Graphics.prototype.lineTo = function(x, y)
{
	this.currentPath.points.push(x, y);
	this.dirty = true;
}

/**
 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
 * (such as lineTo() or drawCircle()) use when drawing.
 *
 * @method beginFill
 * @param color {uint} the color of the fill
 * @param alpha {number} the alpha
 */
PIXI.Graphics.prototype.beginFill = function(color, alpha)
{
	this.filling = true;
	this.fillColor = color || 0;
	this.fillAlpha = (alpha == undefined) ? 1 : alpha;
}

/**
 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
 *
 * @method endFill
 */
PIXI.Graphics.prototype.endFill = function()
{
	this.filling = false;
	this.fillColor = null;
	this.fillAlpha = 1;
}

/**
 * @method drawRect
 *
 * @param x {number} The X coord of the top-left of the rectangle
 * @param y {number} The Y coord of the top-left of the rectangle
 * @param width {number} The width of the rectangle
 * @param height {number} The height of the rectangle
 */
PIXI.Graphics.prototype.drawRect = function( x, y, width, height )
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, width, height], type:PIXI.Graphics.RECT};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws a circle.
 *
 * @method drawCircle
 * @param x {number} The X coord of the center of the circle
 * @param y {number} The Y coord of the center of the circle
 * @param radius {number} The radius of the circle
 */
PIXI.Graphics.prototype.drawCircle = function( x, y, radius)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, radius, radius], type:PIXI.Graphics.CIRC};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws an elipse.
 *
 * @method drawElipse
 * @param x {number}
 * @param y {number}
 * @param width {number}
 * @param height {number}
 */
PIXI.Graphics.prototype.drawElipse = function( x, y, width, height)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, width, height], type:PIXI.Graphics.ELIP};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
 *
 * @method clear
 */
PIXI.Graphics.prototype.clear = function()
{
	this.lineWidth = 0;
	this.filling = false;
	
	this.dirty = true;
	this.clearDirty = true;
	this.graphicsData = [];
}

// SOME TYPES:
PIXI.Graphics.POLY = 0;
PIXI.Graphics.RECT = 1;
PIXI.Graphics.CIRC = 2;
PIXI.Graphics.ELIP = 3;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A set of functions used by the canvas renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.CanvasGraphics = function()
{
	
}


/*
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;
	
	for (var i=0; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		var points = data.points;
		
		context.strokeStyle = color = '#' + ('00000' + ( data.lineColor | 0).toString(16)).substr(-6);

		context.lineWidth = data.lineWidth;
		
		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();
			
			context.moveTo(points[0], points[1]);
			
			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			} 
	      	
	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
				
			// TODO - need to be Undefined!
			if(data.fillColor)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
				context.fillRect(points[0], points[1], points[2], points[3]);
				
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
				context.strokeRect(points[0], points[1], points[2], points[3]);
			}
			
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{
			
			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			
			var elipseData =  data.points;
			
			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;
	
			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;
			
      		context.beginPath();
			
			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle
			
			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  
			context.closePath();
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
      	
	};
}

/*
 * Renders a graphics mask
 *
 * @static
 * @private
 * @method renderGraphicsMask
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;
	
	var len = graphics.graphicsData.length;
	if(len > 1)
	{
		len = 1;
		console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object")
	}
	
	for (var i=0; i < 1; i++) 
	{
		var data = graphics.graphicsData[i];
		var points = data.points;
		
		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();
			context.moveTo(points[0], points[1]);
			
			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			} 
	      	
	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}
			
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			context.beginPath();
			context.rect(points[0], points[1], points[2], points[3]);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{
			
			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			var elipseData =  data.points;
			
			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;
	
			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;
			
      		context.beginPath();
			
			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle
			
			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
			context.closePath();
		}
      	
	   
	};
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * the CanvasRenderer draws the stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class CanvasRenderer
 * @constructor
 * @param width=0 {number} the width of the canvas view
 * @param height=0 {number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 */
PIXI.CanvasRenderer = function(width, height, view, transparent)
{
	this.transparent = transparent;

	/**
	 * The width of the canvas view
	 *
	 * @property width
	 * @type Number
	 * @default 800
	 */
	this.width = width || 800;

	/**
	 * The height of the canvas view
	 *
	 * @property height
	 * @type Number
	 * @default 600
	 */
	this.height = height || 600;

	/**
	 * The canvas element that the everything is drawn to
	 *
	 * @property view
	 * @type Canvas
	 */
	this.view = view || document.createElement( 'canvas' );

	/**
	 * The canvas context that the everything is drawn to
	 * @property context
	 * @type Canvas 2d Context
	 */
	this.context = this.view.getContext("2d");

	this.refresh = true;
	// hack to enable some hardware acceleration!
	//this.view.style["transform"] = "translatez(0)";

    this.view.width = this.width;
	this.view.height = this.height;
	this.count = 0;
}

// constructor
PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;

/**
 * Renders the stage to its canvas view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.CanvasRenderer.prototype.render = function(stage)
{

	//stage.__childrenAdded = [];
	//stage.__childrenRemoved = [];

	// update textures if need be
	PIXI.texturesToUpdate = [];
	PIXI.texturesToDestroy = [];

	PIXI.visibleCount++;
	stage.updateTransform();

	// update the background color
	if(this.view.style.backgroundColor!=stage.backgroundColorString && !this.transparent)this.view.style.backgroundColor = stage.backgroundColorString;

	this.context.setTransform(1,0,0,1,0,0);
	this.context.clearRect(0, 0, this.width, this.height)
    this.renderDisplayObject(stage);
    //as

    // run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}

	// remove frame updates..
	if(PIXI.Texture.frameUpdates.length > 0)
	{
		PIXI.Texture.frameUpdates = [];
	}


}

/**
 * resizes the canvas view to the specified width and height
 *
 * @method resize
 * @param width {number} the new width of the canvas view
 * @param height {number} the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;

	this.view.width = width;
	this.view.height = height;
}

/**
 * Renders a display object
 *
 * @method renderDisplayObject
 * @param displayObject {DisplayObject} The displayObject to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
	// no loger recurrsive!
	var transform;
	var context = this.context;

	context.globalCompositeOperation = 'source-over';

	// one the display object hits this. we can break the loop
	var testObject = displayObject.last._iNext;
	displayObject = displayObject.first;

	do
	{
		transform = displayObject.worldTransform;

		if(!displayObject.visible)
		{
			displayObject = displayObject.last._iNext;
			continue;
		}

		if(!displayObject.renderable)
		{
			displayObject = displayObject._iNext;
			continue;
		}

		if(displayObject instanceof PIXI.Sprite)
		{
			var frame = displayObject.texture.frame;

			if(frame)
			{
				context.globalAlpha = displayObject.worldAlpha;

				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);

				context.drawImage(displayObject.texture.baseTexture.source,
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (displayObject.anchor.x) * -frame.width,
								   (displayObject.anchor.y) * -frame.height,
								   frame.width,
								   frame.height);
			}
	   	}
	   	else if(displayObject instanceof PIXI.Strip)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			this.renderStrip(displayObject);
		}
		else if(displayObject instanceof PIXI.TilingSprite)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			this.renderTilingSprite(displayObject);
		}
		else if(displayObject instanceof PIXI.CustomRenderable)
		{
			displayObject.renderCanvas(this);
		}
		else if(displayObject instanceof PIXI.Graphics)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			PIXI.CanvasGraphics.renderGraphics(displayObject, context);
		}
		else if(displayObject instanceof PIXI.FilterBlock)
		{
			if(displayObject.open)
			{
				context.save();

				var cacheAlpha = displayObject.mask.alpha;
				var maskTransform = displayObject.mask.worldTransform;

				context.setTransform(maskTransform[0], maskTransform[3], maskTransform[1], maskTransform[4], maskTransform[2], maskTransform[5])

				displayObject.mask.worldAlpha = 0.5;

				context.worldAlpha = 0;

				PIXI.CanvasGraphics.renderGraphicsMask(displayObject.mask, context);
				context.clip();

				displayObject.mask.worldAlpha = cacheAlpha;
			}
			else
			{
				context.restore();
			}
		}
	//	count++
		displayObject = displayObject._iNext;


	}
	while(displayObject != testObject)


}

/**
 * Renders a flat strip
 *
 * @method renderStripFlat
 * @param strip {Strip} The Strip to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
{
	var context = this.context;
	var verticies = strip.verticies;
	var uvs = strip.uvs;

	var length = verticies.length/2;
	this.count++;

	context.beginPath();
	for (var i=1; i < length-2; i++)
	{

		// draw some triangles!
		var index = i*2;

		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);

	};

	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
}

/**
 * Renders a tiling sprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tilingsprite to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderTilingSprite = function(sprite)
{
	var context = this.context;

	context.globalAlpha = sprite.worldAlpha;

 	if(!sprite.__tilePattern) sprite.__tilePattern = context.createPattern(sprite.texture.baseTexture.source, "repeat");

	context.beginPath();

	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;

    // offset
    context.scale(tileScale.x,tileScale.y);
    context.translate(tilePosition.x, tilePosition.y);

	context.fillStyle = sprite.__tilePattern;
	context.fillRect(-tilePosition.x,-tilePosition.y,sprite.width / tileScale.x, sprite.height / tileScale.y);

	context.scale(1/tileScale.x, 1/tileScale.y);
    context.translate(-tilePosition.x, -tilePosition.y);

    context.closePath();
}

/**
 * Renders a strip
 *
 * @method renderStrip
 * @param strip {Strip} The Strip to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
	var context = this.context;

	// draw triangles!!
	var verticies = strip.verticies;
	var uvs = strip.uvs;

	var length = verticies.length/2;
	this.count++;
	for (var i=1; i < length-2; i++)
	{

		// draw some triangles!
		var index = i*2;

		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

  		 var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2] * strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
   		 var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3] * strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


		context.save();
		context.beginPath();
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();

		context.clip();


        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;




        context.transform(delta_a/delta, delta_d/delta,
                      delta_b/delta, delta_e/delta,
                      delta_c/delta, delta_f/delta);

		context.drawImage(strip.texture.baseTexture.source, 0, 0);
	  	context.restore();
	};

}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._batchs = [];

/**
 * @private
 */
PIXI._getBatch = function(gl)
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * @private
 */
PIXI._returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * @private
 */
PIXI._restoreBatchs = function(gl)
{
	for (var i=0; i < PIXI._batchs.length; i++) 
	{
	  PIXI._batchs[i].restoreLostContext(gl);
	};
}

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch.
 * All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites
 * in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled
 * automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @constructor
 * @param gl {WebGLContext} an instance of the webGL context
 */
PIXI.WebGLBatch = function(gl)
{
	this.gl = gl;
	
	this.size = 0;

	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
	this.blendMode = PIXI.blendModes.NORMAL;
	this.dynamicSize = 1;
}

// constructor
PIXI.WebGLBatch.prototype.constructor = PIXI.WebGLBatch;

/**
 * Cleans the batch so that is can be returned to an object pool and reused
 *
 * @method clean
 */
PIXI.WebGLBatch.prototype.clean = function()
{
	this.verticies = [];
	this.uvs = [];
	this.indices = [];
	this.colors = [];
	this.dynamicSize = 1;
	this.texture = null;
	this.last = null;
	this.size = 0;
	this.head;
	this.tail;
}

/**
 * Recreates the buffers in the event of a context loss
 *
 * @method restoreLostContext
 * @param gl {WebGLContext}
 */
PIXI.WebGLBatch.prototype.restoreLostContext = function(gl)
{
	this.gl = gl;
	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
}

/**
 * inits the batch's texture and blend mode based if the supplied sprite
 *
 * @method init
 * @param sprite {Sprite} the first sprite to be added to the batch. Only sprites with
 *		the same base texture and blend mode will be allowed to be added to this batch
 */	
PIXI.WebGLBatch.prototype.init = function(sprite)
{
	sprite.batch = this;
	this.dirty = true;
	this.blendMode = sprite.blendMode;
	this.texture = sprite.texture.baseTexture;
	this.head = sprite;
	this.tail = sprite;
	this.size = 1;

	this.growBatch();
}

/**
 * inserts a sprite before the specified sprite
 *
 * @method insertBefore
 * @param sprite {Sprite} the sprite to be added
 * @param nextSprite {nextSprite} the first sprite will be inserted before this sprite
 */	
PIXI.WebGLBatch.prototype.insertBefore = function(sprite, nextSprite)
{
	this.size++;

	sprite.batch = this;
	this.dirty = true;
	var tempPrev = nextSprite.__prev;
	nextSprite.__prev = sprite;
	sprite.__next = nextSprite;

	if(tempPrev)
	{
		sprite.__prev = tempPrev;
		tempPrev.__next = sprite;
	}
	else
	{
		this.head = sprite;
	}
}

/**
 * inserts a sprite after the specified sprite
 *
 * @method insertAfter
 * @param sprite {Sprite} the sprite to be added
 * @param  previousSprite {Sprite} the first sprite will be inserted after this sprite
 */	
PIXI.WebGLBatch.prototype.insertAfter = function(sprite, previousSprite)
{
	this.size++;

	sprite.batch = this;
	this.dirty = true;

	var tempNext = previousSprite.__next;
	previousSprite.__next = sprite;
	sprite.__prev = previousSprite;

	if(tempNext)
	{
		sprite.__next = tempNext;
		tempNext.__prev = sprite;
	}
	else
	{
		this.tail = sprite
	}
}

/**
 * removes a sprite from the batch
 *
 * @method remove
 * @param sprite {Sprite} the sprite to be removed
 */	
PIXI.WebGLBatch.prototype.remove = function(sprite)
{
	this.size--;

	if(this.size == 0)
	{
		sprite.batch = null;
		sprite.__prev = null;
		sprite.__next = null;
		return;
	}

	if(sprite.__prev)
	{
		sprite.__prev.__next = sprite.__next;
	}
	else
	{
		this.head = sprite.__next;
		this.head.__prev = null;
	}

	if(sprite.__next)
	{
		sprite.__next.__prev = sprite.__prev;
	}
	else
	{
		this.tail = sprite.__prev;
		this.tail.__next = null
	}

	sprite.batch = null;
	sprite.__next = null;
	sprite.__prev = null;
	this.dirty = true;
}

/**
 * Splits the batch into two with the specified sprite being the start of the new batch.
 *
 * @method split
 * @param sprite {Sprite} the sprite that indicates where the batch should be split
 * @return {WebGLBatch} the new batch
 */
PIXI.WebGLBatch.prototype.split = function(sprite)
{
	this.dirty = true;

	var batch = new PIXI.WebGLBatch(this.gl);
	batch.init(sprite);
	batch.texture = this.texture;
	batch.tail = this.tail;

	this.tail = sprite.__prev;
	this.tail.__next = null;

	sprite.__prev = null;
	// return a splite batch!

	// TODO this size is wrong!
	// need to recalculate :/ problem with a linked list!
	// unless it gets calculated in the "clean"?

	// need to loop through items as there is no way to know the length on a linked list :/
	var tempSize = 0;
	while(sprite)
	{
		tempSize++;
		sprite.batch = batch;
		sprite = sprite.__next;
	}

	batch.size = tempSize;
	this.size -= tempSize;

	return batch;
}

/**
 * Merges two batchs together
 *
 * @method merge
 * @param batch {WebGLBatch} the batch that will be merged 
 */
PIXI.WebGLBatch.prototype.merge = function(batch)
{
	this.dirty = true;

	this.tail.__next = batch.head;
	batch.head.__prev = this.tail;

	this.size += batch.size;

	this.tail = batch.tail;

	var sprite = batch.head;
	while(sprite)
	{
		sprite.batch = this;
		sprite = sprite.__next;
	}
}

/**
 * Grows the size of the batch. As the elements in the batch cannot have a dynamic size this
 * function is used to increase the size of the batch. It also creates a little extra room so
 * that the batch does not need to be resized every time a sprite is added
 *
 * @method growBatch
 */
PIXI.WebGLBatch.prototype.growBatch = function()
{
	var gl = this.gl;
	if( this.size == 1)
	{
		this.dynamicSize = 1;
	}
	else
	{
		this.dynamicSize = this.size * 1.5
	}
	// grow verts
	this.verticies = new Float32Array(this.dynamicSize * 8);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.verticies , gl.DYNAMIC_DRAW);

	this.uvs  = new Float32Array( this.dynamicSize * 8 );
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);

	this.dirtyUVS = true;

	this.colors  = new Float32Array( this.dynamicSize * 4 );
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors , gl.DYNAMIC_DRAW);

	this.dirtyColors = true;

	this.indices = new Uint16Array(this.dynamicSize * 6); 
	var length = this.indices.length/6;

	for (var i=0; i < length; i++) 
	{
	    var index2 = i * 6;
	    var index3 = i * 4;
		this.indices[index2 + 0] = index3 + 0;
		this.indices[index2 + 1] = index3 + 1;
		this.indices[index2 + 2] = index3 + 2;
		this.indices[index2 + 3] = index3 + 0;
		this.indices[index2 + 4] = index3 + 2;
		this.indices[index2 + 5] = index3 + 3;
	};

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
}

/**
 * Refresh's all the data in the batch and sync's it with the webGL buffers
 *
 * @method refresh
 */
PIXI.WebGLBatch.prototype.refresh = function()
{
	var gl = this.gl;

	if (this.dynamicSize < this.size)
	{
		this.growBatch();
	}

	var indexRun = 0;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index;
	var a, b, c, d, tx, ty;

	var displayObject = this.head;

	while(displayObject)
	{
		index = indexRun * 8;

		var texture = displayObject.texture;

		var frame = texture.frame;
		var tw = texture.baseTexture.width;
		var th = texture.baseTexture.height;

		this.uvs[index + 0] = frame.x / tw;
		this.uvs[index +1] = frame.y / th;

		this.uvs[index +2] = (frame.x + frame.width) / tw;
		this.uvs[index +3] = frame.y / th;

		this.uvs[index +4] = (frame.x + frame.width) / tw;
		this.uvs[index +5] = (frame.y + frame.height) / th; 

		this.uvs[index +6] = frame.x / tw;
		this.uvs[index +7] = (frame.y + frame.height) / th;

		displayObject.updateFrame = false;

		colorIndex = indexRun * 4;
		this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;

		displayObject = displayObject.__next;

		indexRun ++;
	}

	this.dirtyUVS = true;
	this.dirtyColors = true;
}

/**
 * Updates all the relevant geometry and uploads the data to the GPU
 *
 * @method update
 */
PIXI.WebGLBatch.prototype.update = function()
{
	var gl = this.gl;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3

	var a, b, c, d, tx, ty;

	var indexRun = 0;

	var displayObject = this.head;

	while(displayObject)
	{
		if(displayObject.vcount === PIXI.visibleCount)
		{
			width = displayObject.texture.frame.width;
			height = displayObject.texture.frame.height;

			// TODO trim??
			aX = displayObject.anchor.x;// - displayObject.texture.trim.x
			aY = displayObject.anchor.y; //- displayObject.texture.trim.y
			w0 = width * (1-aX);
			w1 = width * -aX;

			h0 = height * (1-aY);
			h1 = height * -aY;

			index = indexRun * 8;

			worldTransform = displayObject.worldTransform;

			a = worldTransform[0];
			b = worldTransform[3];
			c = worldTransform[1];
			d = worldTransform[4];
			tx = worldTransform[2];
			ty = worldTransform[5];

			this.verticies[index + 0 ] = a * w1 + c * h1 + tx; 
			this.verticies[index + 1 ] = d * h1 + b * w1 + ty;

			this.verticies[index + 2 ] = a * w0 + c * h1 + tx; 
			this.verticies[index + 3 ] = d * h1 + b * w0 + ty; 

			this.verticies[index + 4 ] = a * w0 + c * h0 + tx; 
			this.verticies[index + 5 ] = d * h0 + b * w0 + ty; 

			this.verticies[index + 6] =  a * w1 + c * h0 + tx; 
			this.verticies[index + 7] =  d * h0 + b * w1 + ty; 

			if(displayObject.updateFrame || displayObject.texture.updateFrame)
			{
				this.dirtyUVS = true;

				var texture = displayObject.texture;

				var frame = texture.frame;
				var tw = texture.baseTexture.width;
				var th = texture.baseTexture.height;

				this.uvs[index + 0] = frame.x / tw;
				this.uvs[index +1] = frame.y / th;

				this.uvs[index +2] = (frame.x + frame.width) / tw;
				this.uvs[index +3] = frame.y / th;

				this.uvs[index +4] = (frame.x + frame.width) / tw;
				this.uvs[index +5] = (frame.y + frame.height) / th; 

				this.uvs[index +6] = frame.x / tw;
				this.uvs[index +7] = (frame.y + frame.height) / th;

				displayObject.updateFrame = false;
			}

			// TODO this probably could do with some optimisation....
			if(displayObject.cacheAlpha != displayObject.worldAlpha)
			{
				displayObject.cacheAlpha = displayObject.worldAlpha;

				var colorIndex = indexRun * 4;
				this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
				this.dirtyColors = true;
			}
		}
		else
		{
			index = indexRun * 8;

			this.verticies[index + 0 ] = 0;
			this.verticies[index + 1 ] = 0;

			this.verticies[index + 2 ] = 0;
			this.verticies[index + 3 ] = 0;

			this.verticies[index + 4 ] = 0;
			this.verticies[index + 5 ] = 0;

			this.verticies[index + 6] = 0;
			this.verticies[index + 7] = 0;
		}

		indexRun++;
		displayObject = displayObject.__next;
   }
}

/**
 * Draws the batch to the frame buffer
 *
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function(start, end)
{
	start = start || 0;

	if(end == undefined)end = this.size;
	
	if(this.dirty)
	{
		this.refresh();
		this.dirty = false;
	}

	if (this.size == 0)return;

	this.update();
	var gl = this.gl;

	//TODO optimize this!

	var shaderProgram = PIXI.shaderProgram;
	gl.useProgram(shaderProgram);

	// update the verts..
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	// ok..
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	// update the uvs
   	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

    if(this.dirtyUVS)
    {
    	this.dirtyUVS = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER,  0, this.uvs);
    }

    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);

	// update color!
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

	if(this.dirtyColors)
    {
    	this.dirtyColors = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors);
	}

    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);

	// dont need to upload!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

	var len = end - start;

    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, len * 6, gl.UNSIGNED_SHORT, start * 2 * 6 );
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used by the webGL renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.WebGLGraphics = function()
{
	
}

/**
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param projection {Object}
 */
PIXI.WebGLGraphics.renderGraphics = function(graphics, projection)
{
	var gl = PIXI.gl;
	
	if(!graphics._webGL)graphics._webGL = {points:[], indices:[], lastIndex:0, 
										   buffer:gl.createBuffer(),
										   indexBuffer:gl.createBuffer()};
	
	if(graphics.dirty)
	{
		graphics.dirty = false;
		
		if(graphics.clearDirty)
		{
			graphics.clearDirty = false;
			
			graphics._webGL.lastIndex = 0;
			graphics._webGL.points = [];
			graphics._webGL.indices = [];
			
		}
		
		PIXI.WebGLGraphics.updateGraphics(graphics);
	}
	
	
	PIXI.activatePrimitiveShader();
	
	// This  could be speeded up fo sure!
	var m = PIXI.mat3.clone(graphics.worldTransform);
	
	PIXI.mat3.transpose(m);
	
	// set the matrix transform for the 
 	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
 	
 	gl.uniformMatrix3fv(PIXI.primitiveProgram.translationMatrix, false, m);
 	
	gl.uniform2f(PIXI.primitiveProgram.projectionVector, projection.x, projection.y);
	
	gl.uniform1f(PIXI.primitiveProgram.alpha, graphics.worldAlpha);

	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	
	// WHY DOES THIS LINE NEED TO BE THERE???
	gl.vertexAttribPointer(PIXI.shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	// its not even used.. but need to be set or it breaks?
	// only on pc though..
	
	gl.vertexAttribPointer(PIXI.primitiveProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 4 * 6, 0);
	gl.vertexAttribPointer(PIXI.primitiveProgram.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);
	
	// set the index buffer!
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
	
	gl.drawElements(gl.TRIANGLE_STRIP,  graphics._webGL.indices.length, gl.UNSIGNED_SHORT, 0 );
	
	// return to default shader...
	PIXI.activateDefaultShader();
}

/**
 * Updates the graphics object
 *
 * @static
 * @private
 * @method updateGraphics
 * @param graphics {Graphics}
 */
PIXI.WebGLGraphics.updateGraphics = function(graphics)
{
	for (var i=graphics._webGL.lastIndex; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		
		if(data.type == PIXI.Graphics.POLY)
		{
			if(data.fill)
			{
				if(data.points.length>3) 
				PIXI.WebGLGraphics.buildPoly(data, graphics._webGL);
			}
			
			if(data.lineWidth > 0)
			{
				PIXI.WebGLGraphics.buildLine(data, graphics._webGL);
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			PIXI.WebGLGraphics.buildRectangle(data, graphics._webGL);
		}
		else if(data.type == PIXI.Graphics.CIRC || data.type == PIXI.Graphics.ELIP)
		{
			PIXI.WebGLGraphics.buildCircle(data, graphics._webGL);
		}
	};
	
	graphics._webGL.lastIndex = graphics.graphicsData.length;
	
	var gl = PIXI.gl;

	graphics._webGL.glPoints = new Float32Array(graphics._webGL.points);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, graphics._webGL.glPoints, gl.STATIC_DRAW);
	
	graphics._webGL.glIndicies = new Uint16Array(graphics._webGL.indices);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.glIndicies, gl.STATIC_DRAW);
}

/**
 * Builds a rectangle to draw
 *
 * @static
 * @private
 * @method buildRectangle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;
		
		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vertPos = verts.length/6;
		
		// start
		verts.push(x, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x , y + height);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y + height);
		verts.push(r, g, b, alpha);
		
		// insert 2 dead triangles..
		indices.push(vertPos, vertPos, vertPos+1, vertPos+2, vertPos+3, vertPos+3)
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [x, y,
				  x + width, y,
				  x + width, y + height,
				  x, y + height,
				  x, y];
	
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a circle to draw
 *
 * @static
 * @private
 * @method buildCircle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	var totalSegs = 40;
	var seg = (Math.PI * 2) / totalSegs ;
		
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;

		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vecPos = verts.length/6;
		
		indices.push(vecPos);
		
		for (var i=0; i < totalSegs + 1 ; i++) 
		{
			verts.push(x,y, r, g, b, alpha);
			
			verts.push(x + Math.sin(seg * i) * width,
					   y + Math.cos(seg * i) * height,
					   r, g, b, alpha);
		
			indices.push(vecPos++, vecPos++);
		};
		
		indices.push(vecPos-1);
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [];
		
		for (var i=0; i < totalSegs + 1; i++) 
		{
			graphicsData.points.push(x + Math.sin(seg * i) * width,
									 y + Math.cos(seg * i) * height)
		};
		
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a line to draw
 *
 * @static
 * @private
 * @method buildLine
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
{
	// TODO OPTIMISE!
	
	var wrap = true;
	var points = graphicsData.points;
	if(points.length == 0)return;
	
	// get first and last point.. figure out the middle!
	var firstPoint = new PIXI.Point( points[0], points[1] );
	var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
	
	// if the first point is the last point - goona have issues :)
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y)
	{
		points.pop();
		points.pop();
		
		lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
		
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;
		
		points.unshift(midPointX, midPointY);
		points.push(midPointX, midPointY)
	}
	
	var verts = webGLData.points;
	var indices = webGLData.indices;
	var length = points.length / 2;
	var indexCount = points.length;
	var indexStart = verts.length/6;
	
	// DRAW the Line
	var width = graphicsData.lineWidth / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.lineColor);
	var alpha = graphicsData.lineAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var p1x, p1y, p2x, p2y, p3x, p3y;
	var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
	var ipx, ipy;
	var a1, b1, c1, a2, b2, c2;
	var denom, pdist, dist;
	
	p1x = points[0];
	p1y = points[1];
	
	p2x = points[2];
	p2y = points[3];
	
	perpx = -(p1y - p2y);
	perpy =  p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	// start
	verts.push(p1x - perpx , p1y - perpy,
				r, g, b, alpha);
	
	verts.push(p1x + perpx , p1y + perpy,
				r, g, b, alpha);
	
	for (var i = 1; i < length-1; i++) 
	{
		p1x = points[(i-1)*2];
		p1y = points[(i-1)*2 + 1];
		
		p2x = points[(i)*2]
		p2y = points[(i)*2 + 1]
		
		p3x = points[(i+1)*2];
		p3y = points[(i+1)*2 + 1];
		
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		
		dist = Math.sqrt(perpx*perpx + perpy*perpy);
		perpx /= dist;
		perpy /= dist;
		perpx *= width;
		perpy *= width;

		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		
		dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
		perp2x /= dist;
		perp2y /= dist;
		perp2x *= width;
		perp2y *= width;
		
		a1 = (-perpy + p1y) - (-perpy + p2y);
	    b1 = (-perpx + p2x) - (-perpx + p1x);
	    c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
	    a2 = (-perp2y + p3y) - (-perp2y + p2y);
	    b2 = (-perp2x + p2x) - (-perp2x + p3x);
	    c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
	 
	    denom = a1*b2 - a2*b1;
	    
	    if (denom == 0) {
	    	denom+=1;
	    }
	    
	    px = (b1*c2 - b2*c1)/denom;
	    py = (a2*c1 - a1*c2)/denom;
		
		pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);
		
		if(pdist > 140 * 140)
		{
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			
			dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
			perp3x /= dist;
			perp3y /= dist;
			perp3x *= width;
			perp3y *= width;
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x + perp3x, p2y +perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			indexCount++;
		}
		else
		{
			verts.push(px , py);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - (px-p2x), p2y - (py - p2y));
			verts.push(r, g, b, alpha);
		}
	}
	
	p1x = points[(length-2)*2]
	p1y = points[(length-2)*2 + 1] 
	
	p2x = points[(length-1)*2]
	p2y = points[(length-1)*2 + 1]
	
	perpx = -(p1y - p2y)
	perpy = p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	verts.push(p2x - perpx , p2y - perpy)
	verts.push(r, g, b, alpha);
	
	verts.push(p2x + perpx , p2y + perpy)
	verts.push(r, g, b, alpha);
	
	indices.push(indexStart);
	
	for (var i=0; i < indexCount; i++) 
	{
		indices.push(indexStart++);
	};
	
	indices.push(indexStart-1);
}

/**
 * Builds a polygon to draw
 *
 * @static
 * @private
 * @method buildPoly
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
{
	var points = graphicsData.points;
	if(points.length < 6)return;
	
	// get first and last point.. figure out the middle!
	var verts = webGLData.points;
	var indices = webGLData.indices;
	
	var length = points.length / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.fillColor);
	var alpha = graphicsData.fillAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var triangles = PIXI.PolyK.Triangulate(points);
	
	var vertPos = verts.length / 6;
	
	for (var i=0; i < triangles.length; i+=3) 
	{
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i+1] + vertPos);
		indices.push(triangles[i+2] +vertPos);
		indices.push(triangles[i+2] + vertPos);
	};
	
	for (var i = 0; i < length; i++) 
	{
		verts.push(points[i * 2], points[i * 2 + 1],
				   r, g, b, alpha);
	};
}

function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}





/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

// an instance of the gl context..
// only one at the moment :/
PIXI.gl;

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class WebGLRenderer
 * @constructor
 * @param width=0 {number} the width of the canvas view
 * @param height=0 {number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in chrome at the moment)
 * 
 */
PIXI.WebGLRenderer = function(width, height, view, transparent, antialias)
{
	// do a catch.. only 1 webGL renderer..

	this.transparent = !!transparent;

	this.width = width || 800;
	this.height = height || 600;

	this.view = view || document.createElement( 'canvas' ); 
    this.view.width = this.width;
	this.view.height = this.height;

	// deal with losing context..	
    var scope = this;
	this.view.addEventListener('webglcontextlost', function(event) { scope.handleContextLost(event); }, false)
	this.view.addEventListener('webglcontextrestored', function(event) { scope.handleContextRestored(event); }, false)

	this.batchs = [];

	try 
 	{
        PIXI.gl = this.gl = this.view.getContext("experimental-webgl",  {  	
    		 alpha: this.transparent,
    		 antialias:!!antialias, // SPEED UP??
    		 premultipliedAlpha:false,
    		 stencil:true
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }

    PIXI.initPrimitiveShader();
    PIXI.initDefaultShader();
    PIXI.initDefaultStripShader();

    PIXI.activateDefaultShader();

    var gl = this.gl;
    PIXI.WebGLRenderer.gl = gl;

    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
   	gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 

    PIXI.projection = new PIXI.Point(400, 300);

    this.resize(this.width, this.height);
    this.contextLost = false;

    this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
}

// constructor
PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;

/**
 * Gets a new WebGLBatch from the pool
 *
 * @static
 * @method getBatch
 * @return {WebGLBatch}
 * @private 
 */
PIXI.WebGLRenderer.getBatch = function()
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(PIXI.WebGLRenderer.gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * Puts a batch back into the pool
 *
 * @static
 * @method returnBatch
 * @param batch {WebGLBatch} The batch to return
 * @private
 */
PIXI.WebGLRenderer.returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * Renders the stage to its webGL view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	
	// if rendering a new stage clear the batchs..
	if(this.__stage !== stage)
	{
		// TODO make this work
		// dont think this is needed any more?
		this.__stage = stage;
		this.stageRenderGroup.setRenderable(stage);
	}
	
	// TODO not needed now... 
	// update children if need be
	// best to remove first!
	/*for (var i=0; i < stage.__childrenRemoved.length; i++)
	{
		var group = stage.__childrenRemoved[i].__renderGroup
		if(group)group.removeDisplayObject(stage.__childrenRemoved[i]);
	}*/

	// update any textures	
	PIXI.WebGLRenderer.updateTextures();
		
	// update the scene graph	
	PIXI.visibleCount++;
	stage.updateTransform();
	
	var gl = this.gl;
	
	// -- Does this need to be set every frame? -- //
	gl.colorMask(true, true, true, this.transparent); 
	gl.viewport(0, 0, this.width, this.height);	
	
   	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		
	gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2], !this.transparent);     
	gl.clear(gl.COLOR_BUFFER_BIT);

	// HACK TO TEST
	
	this.stageRenderGroup.backgroundColor = stage.backgroundColorSplit;
	this.stageRenderGroup.render(PIXI.projection);
	
	// interaction
	// run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// after rendering lets confirm all frames that have been uodated..
	if(PIXI.Texture.frameUpdates.length > 0)
	{
		for (var i=0; i < PIXI.Texture.frameUpdates.length; i++) 
		{
		  	PIXI.Texture.frameUpdates[i].updateFrame = false;
		};
		
		PIXI.Texture.frameUpdates = [];
	}
}

/**
 * Updates the textures loaded into this webgl renderer
 *
 * @static
 * @method updateTextures
 * @private
 */
PIXI.WebGLRenderer.updateTextures = function()
{
	//TODO break this out into a texture manager...
	for (var i=0; i < PIXI.texturesToUpdate.length; i++) PIXI.WebGLRenderer.updateTexture(PIXI.texturesToUpdate[i]);
	for (var i=0; i < PIXI.texturesToDestroy.length; i++) PIXI.WebGLRenderer.destroyTexture(PIXI.texturesToDestroy[i]);
	PIXI.texturesToUpdate = [];
	PIXI.texturesToDestroy = [];
}

/**
 * Updates a loaded webgl texture
 *
 * @static
 * @method updateTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.updateTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;
	
	if(!texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
	}

	if(texture.hasLoaded)
	{
		gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);
	 	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		// reguler...

		if(!texture._powerOf2)
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}

/**
 * Destroys a loaded webgl texture
 *
 * @method destroyTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.destroyTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;

	if(texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
		gl.deleteTexture(gl.TEXTURE_2D, texture._glTexture);
	}
}

/**
 * resizes the webGL view to the specified width and height
 *
 * @method resize
 * @param width {number} the new width of the webGL view
 * @param height {number} the new height of the webGL view
 */
PIXI.WebGLRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;

	this.view.width = width;
	this.view.height = height;

	this.gl.viewport(0, 0, this.width, this.height);	

	//var projectionMatrix = this.projectionMatrix;

	PIXI.projection.x =  this.width/2;
	PIXI.projection.y =  this.height/2;

//	projectionMatrix[0] = 2/this.width;
//	projectionMatrix[5] = -2/this.height;
//	projectionMatrix[12] = -1;
//	projectionMatrix[13] = 1;
}

/**
 * Handles a lost webgl context
 *
 * @method handleContextLost
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * Handles a restored webgl context
 *
 * @method handleContextRestored
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });

	this.initShaders();	

	for(var key in PIXI.TextureCache) 
	{
        	var texture = PIXI.TextureCache[key].baseTexture;
        	texture._glTexture = null;
        	PIXI.WebGLRenderer.updateTexture(texture);
	};

	for (var i=0; i <  this.batchs.length; i++) 
	{
		this.batchs[i].restoreLostContext(this.gl)//
		this.batchs[i].dirty = true;
	};

	PIXI._restoreBatchs(this.gl);

	this.contextLost = false;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be
 * grouped into a batch. All the sprites in a batch can then be drawn in one go by the
 * GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch
 * even if the batch only contains one sprite. Batching is handled automatically by the
 * webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @contructor
 * @param gl {WebGLContext} An instance of the webGL context
 */
PIXI.WebGLRenderGroup = function(gl)
{
	this.gl = gl;
	this.root;
	
	this.backgroundColor;
	this.batchs = [];
	this.toRemove = [];
}

// constructor
PIXI.WebGLRenderGroup.prototype.constructor = PIXI.WebGLRenderGroup;

/**
 * Add a display object to the webgl renderer
 *
 * @method setRenderable
 * @param displayObject {DisplayObject}
 * @private 
 */
PIXI.WebGLRenderGroup.prototype.setRenderable = function(displayObject)
{
	// has this changed??
	if(this.root)this.removeDisplayObjectAndChildren(this.root);
	
	displayObject.worldVisible = displayObject.visible;
	
	// soooooo //
	// to check if any batchs exist already??
	
	// TODO what if its already has an object? should remove it
	this.root = displayObject;
	this.addDisplayObjectAndChildren(displayObject);
}

/**
 * Renders the stage to its webgl view
 *
 * @method render
 * @param projection {Object}
 */
PIXI.WebGLRenderGroup.prototype.render = function(projection)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;

	
	gl.uniform2f(PIXI.shaderProgram.projectionVector, projection.x, projection.y);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	
	// will render all the elements in the group
	var renderable;
	
	for (var i=0; i < this.batchs.length; i++) 
	{
		
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
			continue;
		}
		
		// non sprite batch..
		var worldVisible = renderable.vcount === PIXI.visibleCount;

		if(renderable instanceof PIXI.TilingSprite)
		{
			if(worldVisible)this.renderTilingSprite(renderable, projection);
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(worldVisible)this.renderStrip(renderable, projection);
		}
		else if(renderable instanceof PIXI.Graphics)
		{
			if(worldVisible && renderable.renderable) PIXI.WebGLGraphics.renderGraphics(renderable, projection);//, projectionMatrix);
		}
		else if(renderable instanceof PIXI.FilterBlock)
		{
			/*
			 * for now only masks are supported..
			 */
			if(renderable.open)
			{
    			gl.enable(gl.STENCIL_TEST);
					
				gl.colorMask(false, false, false, false);
				gl.stencilFunc(gl.ALWAYS,1,0xff);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);
  
				PIXI.WebGLGraphics.renderGraphics(renderable.mask, projection);
  					
				gl.colorMask(true, true, true, false);
				gl.stencilFunc(gl.NOTEQUAL,0,0xff);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
			}
			else
			{
				gl.disable(gl.STENCIL_TEST);
			}
		}
	}
	
}

/**
 * Renders the stage to its webgl view
 *
 * @method handleFilter
 * @param filter {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.handleFilter = function(filter, projection)
{
	
}

/**
 * Renders a specific displayObject
 *
 * @method renderSpecific
 * @param displayObject {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecific = function(displayObject, projection)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;

	gl.uniform2f(PIXI.shaderProgram.projectionVector, projection.x, projection.y);

	// to do!
	// render part of the scene...
	
	var startIndex;
	var startBatchIndex;
	
	var endIndex;
	var endBatchIndex;
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.first;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	var startBatch = nextRenderable.batch;
	
	if(nextRenderable instanceof PIXI.Sprite)
	{
		startBatch = nextRenderable.batch;
		
		var head = startBatch.head;
		var next = head;
		
		// ok now we have the batch.. need to find the start index!
		if(head == nextRenderable)
		{
			startIndex = 0;
		}
		else
		{
			startIndex = 1;
			
			while(head.__next != nextRenderable)
			{
				startIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		startBatch = nextRenderable;
	}
	
	// Get the LAST renderable object
	var lastRenderable = displayObject;
	var endBatch;
	var lastItem = displayObject;
	while(lastItem.children.length > 0)
	{
		lastItem = lastItem.children[lastItem.children.length-1];
		if(lastItem.renderable)lastRenderable = lastItem;
	}
	
	if(lastRenderable instanceof PIXI.Sprite)
	{
		endBatch = lastRenderable.batch;
		
		var head = endBatch.head;
		
		if(head == lastRenderable)
		{
			endIndex = 0;
		}
		else
		{
			endIndex = 1;
			
			while(head.__next != lastRenderable)
			{
				endIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		endBatch = lastRenderable;
	}
	
	// TODO - need to fold this up a bit!
	
	if(startBatch == endBatch)
	{
		if(startBatch instanceof PIXI.WebGLBatch)
		{
			startBatch.render(startIndex, endIndex+1);
		}
		else
		{
			this.renderSpecial(startBatch, projection);
		}
		return;
	}
	
	// now we have first and last!
	startBatchIndex = this.batchs.indexOf(startBatch);
	endBatchIndex = this.batchs.indexOf(endBatch);
	
	// DO the first batch
	if(startBatch instanceof PIXI.WebGLBatch)
	{
		startBatch.render(startIndex);
	}
	else
	{
		this.renderSpecial(startBatch, projection);
	}
	
	// DO the middle batchs..
	for (var i=startBatchIndex+1; i < endBatchIndex; i++) 
	{
		renderable = this.batchs[i];
	
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else
		{
			this.renderSpecial(renderable, projection);
		}
	}
	
	// DO the last batch..
	if(endBatch instanceof PIXI.WebGLBatch)
	{
		endBatch.render(0, endIndex+1);
	}
	else
	{
		this.renderSpecial(endBatch, projection);
	}
}

/**
 * Renders a specific renderable
 *
 * @method renderSpecial
 * @param renderable {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecial = function(renderable, projection)
{
	var worldVisible = renderable.vcount === PIXI.visibleCount

	if(renderable instanceof PIXI.TilingSprite)
	{
		if(worldVisible)this.renderTilingSprite(renderable, projection);
	}
	else if(renderable instanceof PIXI.Strip)
	{
		if(worldVisible)this.renderStrip(renderable, projection);
	}
	else if(renderable instanceof PIXI.CustomRenderable)
	{
		if(worldVisible) renderable.renderWebGL(this, projection);
	}
	else if(renderable instanceof PIXI.Graphics)
	{
		if(worldVisible && renderable.renderable) PIXI.WebGLGraphics.renderGraphics(renderable, projection);
	}
	else if(renderable instanceof PIXI.FilterBlock)
	{
		/*
		 * for now only masks are supported..
		 */

		var gl = PIXI.gl;

		if(renderable.open)
		{
			gl.enable(gl.STENCIL_TEST);
				
			gl.colorMask(false, false, false, false);
			gl.stencilFunc(gl.ALWAYS,1,0xff);
			gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);
  
			PIXI.WebGLGraphics.renderGraphics(renderable.mask, projection);
			
			// we know this is a render texture so enable alpha too..
			gl.colorMask(true, true, true, true);
			gl.stencilFunc(gl.NOTEQUAL,0,0xff);
			gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
		}
		else
		{
			gl.disable(gl.STENCIL_TEST);
		}
	}
}

/**
 * Updates a webgl texture
 *
 * @method updateTexture
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.updateTexture = function(displayObject)
{
	
	// TODO definitely can optimse this function..
	
	this.removeObject(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	this.insertObject(displayObject, previousRenderable, nextRenderable);
}

/**
 * Adds filter blocks
 *
 * @method addFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addFilterBlocks = function(start, end)
{
	start.__renderGroup = this;
	end.__renderGroup = this;
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = start;
	while(previousRenderable != this.root)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	this.insertAfter(start, previousRenderable);
		
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var previousRenderable2 = end;
	while(previousRenderable2 != this.root)
	{
		previousRenderable2 = previousRenderable2._iPrev;
		if(previousRenderable2.renderable && previousRenderable2.__renderGroup)break;
	}
	this.insertAfter(end, previousRenderable2);
}

/**
 * Remove filter blocks
 *
 * @method removeFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeFilterBlocks = function(start, end)
{
	this.removeObject(start);
	this.removeObject(end);
}

/**
 * Adds a display object and children to the webgl context
 *
 * @method addDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup)displayObject.__renderGroup.removeDisplayObjectAndChildren(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root.first)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	// one the display object hits this. we can break the loop	
	
	var tempObject = displayObject.first;
	var testObject = displayObject.last._iNext;
	do	
	{
		tempObject.__renderGroup = this;
		
		if(tempObject.renderable)
		{
		
			this.insertObject(tempObject, previousRenderable, nextRenderable);
			previousRenderable = tempObject;
		}
		
		tempObject = tempObject._iNext;
	}
	while(tempObject != testObject)
}

/**
 * Removes a display object and children to the webgl context
 *
 * @method removeDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup != this)return;
	
//	var displayObject = displayObject.first;
	var lastObject = displayObject.last;
	do	
	{
		displayObject.__renderGroup = null;
		if(displayObject.renderable)this.removeObject(displayObject);
		displayObject = displayObject._iNext;
	}
	while(displayObject)
}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertObject
 * @param displayObject {DisplayObject}
 * @param previousObject {DisplayObject}
 * @param nextObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertObject = function(displayObject, previousObject, nextObject)
{
	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	var previousSprite = previousObject;
	var nextSprite = nextObject;
	
	/*
	 * so now we have the next renderable and the previous renderable
	 * 
	 */
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch
		var nextBatch
		
		if(previousSprite instanceof PIXI.Sprite)
		{
			previousBatch = previousSprite.batch;
			if(previousBatch)
			{
				if(previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode)
				{
					previousBatch.insertAfter(displayObject, previousSprite);
					return;
				}
			}
		}
		else
		{
			// TODO reword!
			previousBatch = previousSprite;
		}
	
		if(nextSprite)
		{
			if(nextSprite instanceof PIXI.Sprite)
			{
				nextBatch = nextSprite.batch;
			
				//batch may not exist if item was added to the display list but not to the webGL
				if(nextBatch)
				{
					if(nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode)
					{
						nextBatch.insertBefore(displayObject, nextSprite);
						return;
					}
					else
					{
						if(nextBatch == previousBatch)
						{
							// THERE IS A SPLIT IN THIS BATCH! //
							var splitBatch = previousBatch.split(nextSprite);
							// COOL!
							// add it back into the array	
							/*
							 * OOPS!
							 * seems the new sprite is in the middle of a batch
							 * lets split it.. 
							 */
							var batch = PIXI.WebGLRenderer.getBatch();

							var index = this.batchs.indexOf( previousBatch );
							batch.init(displayObject);
							this.batchs.splice(index+1, 0, batch, splitBatch);
							
							return;
						}
					}
				}
			}
			else
			{
				// TODO re-word!
				
				nextBatch = nextSprite;
			}
		}
		
		/*
		 * looks like it does not belong to any batch!
		 * but is also not intersecting one..
		 * time to create anew one!
		 */
		
		var batch =  PIXI.WebGLRenderer.getBatch();
		batch.init(displayObject);

		if(previousBatch) // if this is invalid it means 
		{
			var index = this.batchs.indexOf( previousBatch );
			this.batchs.splice(index+1, 0, batch);
		}
		else
		{
			this.batchs.push(batch);
		}
		
		return;
	}
	else if(displayObject instanceof PIXI.TilingSprite)
	{
		
		// add to a batch!!
		this.initTilingSprite(displayObject);
	//	this.batchs.push(displayObject);
		
	}
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
	//	this.batchs.push(displayObject);
	}
	else if(displayObject)// instanceof PIXI.Graphics)
	{
		//displayObject.initWebGL(this);
		
		// add to a batch!!
		//this.initStrip(displayObject);
		//this.batchs.push(displayObject);
	}
	
	this.insertAfter(displayObject, previousSprite);
			
	// insert and SPLIT!

}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertAfter
 * @param item {DisplayObject}
 * @param displayObject {DisplayObject} The object to insert
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertAfter = function(item, displayObject)
{
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch = displayObject.batch;
		
		if(previousBatch)
		{
			// so this object is in a batch!
			
			// is it not? need to split the batch
			if(previousBatch.tail == displayObject)
			{
				// is it tail? insert in to batchs	
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item);
			}
			else
			{
				// TODO MODIFY ADD / REMOVE CHILD TO ACCOUNT FOR FILTERS (also get prev and next) //
				
				// THERE IS A SPLIT IN THIS BATCH! //
				var splitBatch = previousBatch.split(displayObject.__next);
				
				// COOL!
				// add it back into the array	
				/*
				 * OOPS!
				 * seems the new sprite is in the middle of a batch
				 * lets split it.. 
				 */
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item, splitBatch);
			}
		}
		else
		{
			this.batchs.push(item);
		}
	}
	else
	{
		var index = this.batchs.indexOf( displayObject );
		this.batchs.splice(index+1, 0, item);
	}
}

/**
 * Removes a displayObject from the linked list
 *
 * @method removeObject
 * @param displayObject {DisplayObject} The object to remove
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeObject = function(displayObject)
{
	// loop through children..
	// display object //
	
	// add a child from the render group..
	// remove it and all its children!
	//displayObject.cacheVisible = false;//displayObject.visible;

	/*
	 * removing is a lot quicker..
	 * 
	 */
	var batchToRemove;
	
	if(displayObject instanceof PIXI.Sprite)
	{
		// should always have a batch!
		var batch = displayObject.batch;
		if(!batch)return; // this means the display list has been altered befre rendering
		
		batch.remove(displayObject);
		
		if(batch.size==0)
		{
			batchToRemove = batch;
		}
	}
	else
	{
		batchToRemove = displayObject;
	}
	
	/*
	 * Looks like there is somthing that needs removing!
	 */
	if(batchToRemove)	
	{
		var index = this.batchs.indexOf( batchToRemove );
		if(index == -1)return;// this means it was added then removed before rendered
		
		// ok so.. check to see if you adjacent batchs should be joined.
		// TODO may optimise?
		if(index == 0 || index == this.batchs.length-1)
		{
			// wha - eva! just get of the empty batch!
			this.batchs.splice(index, 1);
			if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
		
			return;
		}
		
		if(this.batchs[index-1] instanceof PIXI.WebGLBatch && this.batchs[index+1] instanceof PIXI.WebGLBatch)
		{
			if(this.batchs[index-1].texture == this.batchs[index+1].texture && this.batchs[index-1].blendMode == this.batchs[index+1].blendMode)
			{
				//console.log("MERGE")
				this.batchs[index-1].merge(this.batchs[index+1]);
				
				if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
				PIXI.WebGLRenderer.returnBatch(this.batchs[index+1]);
				this.batchs.splice(index, 2);
				return;
			}
		}
		
		this.batchs.splice(index, 1);
		if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
	}
}

/**
 * Initializes a tiling sprite
 *
 * @method initTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to initialize
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initTilingSprite = function(sprite)
{
	var gl = this.gl;

	// make the texture tilable..
			
	sprite.verticies = new Float32Array([0, 0,
										  sprite.width, 0,
										  sprite.width,  sprite.height,
										 0,  sprite.height]);
					
	sprite.uvs = new Float32Array([0, 0,
									1, 0,
									1, 1,
									0, 1]);
				
	sprite.colors = new Float32Array([1,1,1,1]);
	
	sprite.indices =  new Uint16Array([0, 1, 3,2])//, 2]);
	
	sprite._vertexBuffer = gl.createBuffer();
	sprite._indexBuffer = gl.createBuffer();
	sprite._uvBuffer = gl.createBuffer();
	sprite._colorBuffer = gl.createBuffer();
						
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.verticies, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  sprite.uvs, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, sprite._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sprite.indices, gl.STATIC_DRAW);
    
//    return ( (x > 0) && ((x & (x - 1)) == 0) );

	if(sprite.texture.baseTexture._glTexture)
	{
    	gl.bindTexture(gl.TEXTURE_2D, sprite.texture.baseTexture._glTexture);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		sprite.texture.baseTexture._powerOf2 = true;
	}
	else
	{
		sprite.texture.baseTexture._powerOf2 = true;
	}
}

/**
 * Renders a Strip
 *
 * @method renderStrip
 * @param strip {Strip} The strip to render
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderStrip = function(strip, projection)
{
	var gl = this.gl;
	var shaderProgram = PIXI.shaderProgram;
//	mat
	//var mat4Real = PIXI.mat3.toMat4(strip.worldTransform);
	//PIXI.mat4.transpose(mat4Real);
	//PIXI.mat4.multiply(projectionMatrix, mat4Real, mat4Real )

	
	gl.useProgram(PIXI.stripShaderProgram);

	var m = PIXI.mat3.clone(strip.worldTransform);
	
	PIXI.mat3.transpose(m);
	
	// set the matrix transform for the 
 	gl.uniformMatrix3fv(PIXI.stripShaderProgram.translationMatrix, false, m);
	gl.uniform2f(PIXI.stripShaderProgram.projectionVector, projection.x, projection.y);
	gl.uniform1f(PIXI.stripShaderProgram.alpha, strip.worldAlpha);

/*
	if(strip.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	*/
	
	
	if(!strip.dirty)
	{
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, strip.verticies)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	}
	else
	{
		strip.dirty = false;
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	   	gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
	    
	}
	//console.log(gl.TRIANGLE_STRIP);
	
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
  	gl.useProgram(PIXI.shaderProgram);
}

/**
 * Renders a TilingSprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to render
 * @param projectionMatrix {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderTilingSprite = function(sprite, projectionMatrix)
{
	var gl = this.gl;
	var shaderProgram = PIXI.shaderProgram;
	
	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;
	
	var offsetX =  tilePosition.x/sprite.texture.baseTexture.width;
	var offsetY =  tilePosition.y/sprite.texture.baseTexture.height;
	
	var scaleX =  (sprite.width / sprite.texture.baseTexture.width)  / tileScale.x;
	var scaleY =  (sprite.height / sprite.texture.baseTexture.height) / tileScale.y;

	sprite.uvs[0] = 0 - offsetX;
	sprite.uvs[1] = 0 - offsetY;
	
	sprite.uvs[2] = (1 * scaleX)  -offsetX;
	sprite.uvs[3] = 0 - offsetY;
	
	sprite.uvs[4] = (1 *scaleX) - offsetX;
	sprite.uvs[5] = (1 *scaleY) - offsetY;
	
	sprite.uvs[6] = 0 - offsetX;
	sprite.uvs[7] = (1 *scaleY) - offsetY;
	
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, sprite.uvs)
	
	this.renderStrip(sprite, projectionMatrix);
}

/**
 * Initializes a strip to be rendered
 *
 * @method initStrip
 * @param strip {Strip} The strip to initialize
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initStrip = function(strip)
{
	// build the strip!
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
	
	strip._vertexBuffer = gl.createBuffer();
	strip._indexBuffer = gl.createBuffer();
	strip._uvBuffer = gl.createBuffer();
	strip._colorBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.DYNAMIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  strip.uvs, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);

	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/*
 * the default suoer fast shader!
 */

PIXI.shaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
    "gl_FragColor = gl_FragColor * vColor;",
  "}"
];

PIXI.shaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  //"uniform mat4 uMVMatrix;",
  
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
   // "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
    "gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];

/*
 * the triangle strip shader..
 */

PIXI.stripShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform float alpha;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
    "gl_FragColor = gl_FragColor * alpha;",
  "}"
];


PIXI.stripShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
	"vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
    "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];


/*
 * primitive shader..
 */

PIXI.primitiveShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec4 vColor;",
  "void main(void) {",
    "gl_FragColor = vColor;",
  "}"
];

PIXI.primitiveShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec4 aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "uniform float alpha;",
  "varying vec4 vColor;",
  "void main(void) {",
  	"vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
    "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vColor = aColor  * alpha;",
  "}"
];

PIXI.initPrimitiveShader = function() 
{
	var gl = PIXI.gl;

	var shaderProgram = PIXI.compileProgram(PIXI.primitiveShaderVertexSrc, PIXI.primitiveShaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    
	shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");

	PIXI.primitiveProgram = shaderProgram;
}

PIXI.initDefaultShader = function() 
{
	var gl = this.gl;
	var shaderProgram = PIXI.compileProgram(PIXI.shaderVertexSrc, PIXI.shaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");

   // shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
	PIXI.shaderProgram = shaderProgram;
}

PIXI.initDefaultStripShader = function() 
{
	var gl = this.gl;
	var shaderProgram = PIXI.compileProgram(PIXI.stripShaderVertexSrc, PIXI.stripShaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
	shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");

	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");

    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
	PIXI.stripShaderProgram = shaderProgram;
}

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

PIXI._CompileShader = function(gl, shaderSrc, shaderType)
{
  var src = shaderSrc.join("\n");
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


PIXI.compileProgram = function(vertexSrc, fragmentSrc)
{
	var gl = PIXI.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);
	
	var shaderProgram = gl.createProgram();
	
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

	return shaderProgram;
} 


PIXI.activateDefaultShader = function()
{
	var gl = PIXI.gl;
	var shaderProgram = PIXI.shaderProgram;
	
	gl.useProgram(shaderProgram);
	
	
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    gl.enableVertexAttribArray(shaderProgram.colorAttribute);
}

	

PIXI.activatePrimitiveShader = function()
{
	var gl = PIXI.gl;
	
	gl.disableVertexAttribArray(PIXI.shaderProgram.textureCoordAttribute);
    gl.disableVertexAttribArray(PIXI.shaderProgram.colorAttribute);
    
	gl.useProgram(PIXI.primitiveProgram);
	
	gl.enableVertexAttribArray(PIXI.primitiveProgram.vertexPositionAttribute);
	gl.enableVertexAttribArray(PIXI.primitiveProgram.colorAttribute);
} 


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];
PIXI.texturesToDestroy = [];

/**
 * A texture stores the information that represents an image. All textures have a base texture
 *
 * @class BaseTexture
 * @uses EventTarget
 * @constructor
 * @param source {String} the source object (image or canvas)
 */
PIXI.BaseTexture = function(source)
{
	PIXI.EventTarget.call( this );

	/**
	 * [read-only] The width of the base texture set when the image has loaded
	 *
	 * @property width
	 * @type Number
	 * @readOnly
	 */
	this.width = 100;

	/**
	 * [read-only] The height of the base texture set when the image has loaded
	 *
	 * @property height
	 * @type Number
	 * @readOnly
	 */
	this.height = 100;

	/**
	 * [read-only] Describes if the base texture has loaded or not
	 *
	 * @property hasLoaded
	 * @type Boolean
	 * @readOnly
	 */
	this.hasLoaded = false;

	/**
	 * The source that is loaded to create the texture
	 *
	 * @property source
	 * @type Image
	 */
	this.source = source;

	if(!source)return;

	if(this.source instanceof Image || this.source instanceof HTMLImageElement)
	{
		if(this.source.complete)
		{
			this.hasLoaded = true;
			this.width = this.source.width;
			this.height = this.source.height;
			
			PIXI.texturesToUpdate.push(this);
		}
		else
		{
			
			var scope = this;
			this.source.onload = function(){
				
				scope.hasLoaded = true;
				scope.width = scope.source.width;
				scope.height = scope.source.height;
			
				// add it to somewhere...
				PIXI.texturesToUpdate.push(scope);
				scope.dispatchEvent( { type: 'loaded', content: scope } );
			}
			//	this.image.src = imageUrl;
		}
	}
	else
	{
		this.hasLoaded = true;
		this.width = this.source.width;
		this.height = this.source.height;
			
		PIXI.texturesToUpdate.push(this);
	}

	this._powerOf2 = false;
}

PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;

/**
 * Destroys this base texture
 *
 * @method destroy
 */
PIXI.BaseTexture.prototype.destroy = function()
{
	if(this.source instanceof Image)
	{
		this.source.src = null;
	}
	this.source = null;
	PIXI.texturesToDestroy.push(this);
}

/**
 * Helper function that returns a base texture based on an image url
 * If the image is not in the base texture cache it will be  created and loaded
 *
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @return BaseTexture
 */
PIXI.BaseTexture.fromImage = function(imageUrl, crossorigin)
{
	var baseTexture = PIXI.BaseTextureCache[imageUrl];
	if(!baseTexture)
	{
		// new Image() breaks tex loading in some versions of Chrome.
		// See https://code.google.com/p/chromium/issues/detail?id=238071
		var image = new Image();//document.createElement('img'); 
		if (crossorigin)
		{
			image.crossOrigin = '';
		}
		image.src = imageUrl;
		baseTexture = new PIXI.BaseTexture(image);
		PIXI.BaseTextureCache[imageUrl] = baseTexture;
	}

	return baseTexture;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.TextureCache = {};
PIXI.FrameCache = {};

/**
 * A texture stores the information that represents an image or part of an image. It cannot be added
 * to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
 *
 * @class Texture
 * @uses EventTarget
 * @constructor
 * @param baseTexture {BaseTexture} The base texture source to create the texture from
 * @param frmae {Rectangle} The rectangle frame of the texture to show
 */
PIXI.Texture = function(baseTexture, frame)
{
	PIXI.EventTarget.call( this );

	if(!frame)
	{
		this.noFrame = true;
		frame = new PIXI.Rectangle(0,0,1,1);
	}

	if(baseTexture instanceof PIXI.Texture)
		baseTexture = baseTexture.baseTexture;

	/**
	 * The base texture of this texture
	 *
	 * @property baseTexture
	 * @type BaseTexture
	 */
	this.baseTexture = baseTexture;

	/**
	 * The frame specifies the region of the base texture that this texture uses
	 *
	 * @property frame
	 * @type Rectangle
	 */
	this.frame = frame;

	/**
	 * The trim point
	 *
	 * @property trim
	 * @type Point
	 */
	this.trim = new PIXI.Point();

	this.scope = this;

	if(baseTexture.hasLoaded)
	{
		if(this.noFrame)frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
		//console.log(frame)
		
		this.setFrame(frame);
	}
	else
	{
		var scope = this;
		baseTexture.addEventListener( 'loaded', function(){ scope.onBaseTextureLoaded()} );
	}
}

PIXI.Texture.prototype.constructor = PIXI.Texture;

/**
 * Called when the base texture is loaded
 *
 * @method onBaseTextureLoaded
 * @param event
 * @private
 */
PIXI.Texture.prototype.onBaseTextureLoaded = function(event)
{
	var baseTexture = this.baseTexture;
	baseTexture.removeEventListener( 'loaded', this.onLoaded );

	if(this.noFrame)this.frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
	this.noFrame = false;
	this.width = this.frame.width;
	this.height = this.frame.height;

	this.scope.dispatchEvent( { type: 'update', content: this } );
}

/**
 * Destroys this texture
 *
 * @method destroy
 * @param destroyBase {Boolean} Whether to destroy the base texture as well
 */
PIXI.Texture.prototype.destroy = function(destroyBase)
{
	if(destroyBase)this.baseTexture.destroy();
}

/**
 * Specifies the rectangle region of the baseTexture
 *
 * @method setFrame
 * @param frame {Rectangle} The frame of the texture to set it to
 */
PIXI.Texture.prototype.setFrame = function(frame)
{
	this.frame = frame;
	this.width = frame.width;
	this.height = frame.height;

	if(frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)
	{
		throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
	}

	this.updateFrame = true;

	PIXI.Texture.frameUpdates.push(this);
	//this.dispatchEvent( { type: 'update', content: this } );
}

/**
 * Helper function that returns a texture based on an image url
 * If the image is not in the texture cache it will be  created and loaded
 *
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 * @return Texture
 */
PIXI.Texture.fromImage = function(imageUrl, crossorigin)
{
	var texture = PIXI.TextureCache[imageUrl];
	
	if(!texture)
	{
		texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin));
		PIXI.TextureCache[imageUrl] = texture;
	}
	
	return texture;
}

/**
 * Helper function that returns a texture based on a frame id
 * If the frame id is not in the texture cache an error will be thrown
 *
 * @static
 * @method fromFrame
 * @param frameId {String} The frame id of the texture
 * @return Texture
 */
PIXI.Texture.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache " + this);
	return texture;
}

/**
 * Helper function that returns a texture based on a canvas element
 * If the canvas is not in the texture cache it will be  created and loaded
 *
 * @static
 * @method fromCanvas
 * @param canvas {Canvas} The canvas element source of the texture
 * @return Texture
 */
PIXI.Texture.fromCanvas = function(canvas)
{
	var	baseTexture = new PIXI.BaseTexture(canvas);
	return new PIXI.Texture(baseTexture);
}


/**
 * Adds a texture to the textureCache.
 *
 * @static
 * @method addTextureToCache
 * @param texture {Texture}
 * @param id {String} the id that the texture will be stored against.
 */
PIXI.Texture.addTextureToCache = function(texture, id)
{
	PIXI.TextureCache[id] = texture;
}

/**
 * Remove a texture from the textureCache. 
 *
 * @static
 * @method removeTextureFromCache
 * @param id {String} the id of the texture to be removed
 * @return {Texture} the texture that was removed
 */
PIXI.Texture.removeTextureFromCache = function(id)
{
	var texture = PIXI.TextureCache[id]
	PIXI.TextureCache[id] = null;
	return texture;
}

// this is more for webGL.. it contains updated frames..
PIXI.Texture.frameUpdates = [];


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it.

 __Hint__: All DisplayObjects (exmpl. Sprites) that renders on RenderTexture should be preloaded. 
 Otherwise black rectangles will be drawn instead.  
 
 RenderTexture takes snapshot of DisplayObject passed to render method. If DisplayObject is passed to render method, position and rotation of it will be ignored. For example:
 
	var renderTexture = new PIXI.RenderTexture(800, 600);
	var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
	sprite.position.x = 800/2;
	sprite.position.y = 600/2;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	renderTexture.render(sprite);

 Sprite in this case will be rendered to 0,0 position. To render this sprite at center DisplayObjectContainer should be used:

	var doc = new PIXI.DisplayObjectContainer();
	doc.addChild(sprite);
	renderTexture.render(doc);  // Renders to center of renderTexture

 @class RenderTexture
 @extends Texture
 @constructor
 @param width {number} The width of the render texture
 @param height {number} The height of the render texture
 */
PIXI.RenderTexture = function(width, height)
{
	PIXI.EventTarget.call( this );

	this.width = width || 100;
	this.height = height || 100;

	this.indetityMatrix = PIXI.mat3.create();

	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);	

	if(PIXI.gl)
	{
		this.initWebGL();
	}
	else
	{
		this.initCanvas();
	}
}

PIXI.RenderTexture.prototype = Object.create( PIXI.Texture.prototype );
PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;

/**
 * Initializes the webgl data for this texture
 *
 * @method initWebGL
 * @private
 */
PIXI.RenderTexture.prototype.initWebGL = function()
{
	var gl = PIXI.gl;
	this.glFramebuffer = gl.createFramebuffer();

   	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );

    this.glFramebuffer.width = this.width;
    this.glFramebuffer.height = this.height;	

	this.baseTexture = new PIXI.BaseTexture();

	this.baseTexture.width = this.width;
	this.baseTexture.height = this.height;

    this.baseTexture._glTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.baseTexture.isRender = true;

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.baseTexture._glTexture, 0);

	// create a projection matrix..
	this.projection = new PIXI.Point(this.width/2 , this.height/2);

	// set the correct render function..
	this.render = this.renderWebGL;

	
}


PIXI.RenderTexture.prototype.resize = function(width, height)
{

	this.width = width;
	this.height = height;
	
	if(PIXI.gl)
	{
		this.projection.x = this.width/2
		this.projection.y = this.height/2;
	
		var gl = PIXI.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	}
	else
	{
		
		this.frame.width = this.width
		this.frame.height = this.height;
		this.renderer.resize(this.width, this.height);
	}
}

/**
 * Initializes the canvas data for this texture
 *
 * @method initCanvas
 * @private
 */
PIXI.RenderTexture.prototype.initCanvas = function()
{
	this.renderer = new PIXI.CanvasRenderer(this.width, this.height, null, 0);

	this.baseTexture = new PIXI.BaseTexture(this.renderer.view);
	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);

	this.render = this.renderCanvas;
}

/**
 * This function will draw the display object to the texture.
 *
 * @method renderWebGL
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, position, clear)
{
	var gl = PIXI.gl;

	// enable the alpha color mask..
	gl.colorMask(true, true, true, true); 

	gl.viewport(0, 0, this.width, this.height);	

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );

	if(clear)
	{
		gl.clearColor(0,0,0, 0);     
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	// THIS WILL MESS WITH HIT TESTING!
	var children = displayObject.children;

	//TODO -? create a new one??? dont think so!
	var originalWorldTransform = displayObject.worldTransform;
	displayObject.worldTransform = PIXI.mat3.create();//sthis.indetityMatrix;
	// modify to flip...
	displayObject.worldTransform[4] = -1;
	displayObject.worldTransform[5] = this.projection.y * 2;

	
	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] -= position.y;
	}
	
	PIXI.visibleCount++;
	displayObject.vcount = PIXI.visibleCount;
	
	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	var renderGroup = displayObject.__renderGroup;

	if(renderGroup)
	{
		if(displayObject == renderGroup.root)
		{
			renderGroup.render(this.projection);
		}
		else
		{
			renderGroup.renderSpecific(displayObject, this.projection);
		}
	}
	else
	{
		if(!this.renderGroup)this.renderGroup = new PIXI.WebGLRenderGroup(gl);
		this.renderGroup.setRenderable(displayObject);
		this.renderGroup.render(this.projection);
	}

	displayObject.worldTransform = originalWorldTransform;
}


/**
 * This function will draw the display object to the texture.
 *
 * @method renderCanvas
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, position, clear)
{
	var children = displayObject.children;

	displayObject.worldTransform = PIXI.mat3.create();
	
	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] = position.y;
	}
	

	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	if(clear)this.renderer.context.clearRect(0,0, this.width, this.height);
	
    this.renderer.renderDisplayObject(displayObject);
    
    this.renderer.context.setTransform(1,0,0,1,0,0); 
    

  //  PIXI.texturesToUpdate.push(this.baseTexture);
}


/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

/**
 * Adds event emitter functionality to a class
 *
 * @class EventTarget
 * @example
 *		function MyEmitter() {
 *			PIXI.EventTarget.call(this); //mixes in event target stuff
 *		}
 *
 *		var em = new MyEmitter();
 *		em.emit({ type: 'eventName', data: 'some data' });
 */
PIXI.EventTarget = function () {

	var listeners = {};
	
	this.addEventListener = this.on = function ( type, listener ) {
		
		
		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];
			
		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );
		}

	};

	this.dispatchEvent = this.emit = function ( event ) {
		
		for ( var listener in listeners[ event.type ] ) {

			listeners[ event.type ][ listener ]( event );
			
		}

	};

	this.removeEventListener = this.off = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

/**
 * A polyfill for requestAnimationFrame
 *
 * @method requestAnimationFrame
 */
/**
 * A polyfill for cancelAnimationFrame
 *
 * @method cancelAnimationFrame
 */
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

window.requestAnimFrame = window.requestAnimationFrame;

/**
 * Converts a hex color number to an [R, G, B] array
 *
 * @method HEXtoRGB
 * @param hex {number}
 */
function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}

/**
 * A polyfill for Function.prototype.bind
 *
 * @method bind
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}

/**
 * A wrapper for ajax requests to be handled cross browser
 *
 * @class AjaxRequest
 * @constructor
 */
var AjaxRequest = PIXI.AjaxRequest = function()
{
	var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
	
	if (window.ActiveXObject)
	{ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++)
		{
			try{
				return new ActiveXObject(activexmodes[i])
			}
   			catch(e){
    			//suppress error
   			}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  	{
  		return new XMLHttpRequest()
 	}
 	else
 	{
		return false;
 	}
}

/*
 * DEBUGGING ONLY
 */
PIXI.runList = function(item)
{
	console.log(">>>>>>>>>")
	console.log("_")
	var safe = 0;
	var tmp = item.first;
	console.log(tmp);
	
	while(tmp._iNext)
	{
		safe++;
		tmp = tmp._iNext;
		console.log(tmp);
	//	console.log(tmp);
	
		if(safe > 100)
		{
			console.log("BREAK")
			break
		}
	}	
}






/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

 if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = PIXI;
    }
    exports.PIXI = PIXI;
  } else {
    root.PIXI = PIXI;
  }


}).call(this);
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



/**
 * The interaction manager deals with mouse and touch events. Any DisplayObject can be interactive
 * This manager also supports multitouch.
 *
 * @class InteractionManager
 * @constructor
 * @param stage {Stage} The stage to handle interactions
 */
PIXI.InteractionManager = function(stage)
{
	/**
	 * a refference to the stage
	 *
	 * @property stage
	 * @type Stage
	 */
	this.stage = stage;

	/**
	 * the mouse data
	 *
	 * @property mouse
	 * @type InteractionData
	 */
	this.mouse = new PIXI.InteractionData();

	/**
	 * an object that stores current touches (InteractionData) by id reference
	 *
	 * @property touchs
	 * @type Object
	 */
	this.touchs = {};


	
	// helpers
	this.tempPoint = new PIXI.Point();
	//this.tempMatrix =  mat3.create();

	this.mouseoverEnabled = true;

	//tiny little interactiveData pool!
	this.pool = [];

	this.interactiveItems = [];
	
	
	this.last = 0;
}

// constructor
PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;

/**
 * Collects an interactive sprite recursively to have their interactions managed
 *
 * @method collectInteractiveSprite
 * @param displayObject {DisplayObject} the displayObject to collect
 * @param iParent {DisplayObject}
 * @private
 */
PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent)
{
	var children = displayObject.children;
	var length = children.length;
	
	/// make an interaction tree... {item.__interactiveParent}
	for (var i = length-1; i >= 0; i--)
	{
		var child = children[i];
		
//		if(child.visible) {
			// push all interactive bits
			if(child.interactive)
			{
				iParent.interactiveChildren = true;
				//child.__iParent = iParent;
				this.interactiveItems.push(child);

				if(child.children.length > 0)
				{
					this.collectInteractiveSprite(child, child);
				}
			}
			else
			{
				child.__iParent = null;

				if(child.children.length > 0)
				{
					this.collectInteractiveSprite(child, iParent);
				}
			}
//		}
	}
}

/**
 * Sets the target for event delegation
 *
 * @method setTarget
 * @param target {WebGLRenderer|CanvasRenderer} the renderer to bind events to
 * @private
 */
PIXI.InteractionManager.prototype.setTarget = function(target)
{
	if (window.navigator.msPointerEnabled) 
	{
		// time to remove some of that zoom in ja..
		target.view.style["-ms-content-zooming"] = "none";
    	target.view.style["-ms-touch-action"] = "none"
    
		// DO some window specific touch!
	}
	
	this.target = target;
	target.view.addEventListener('mousemove',  this.onMouseMove.bind(this), true);
	target.view.addEventListener('mousedown',  this.onMouseDown.bind(this), true);
 	document.body.addEventListener('mouseup',  this.onMouseUp.bind(this), true);
 	target.view.addEventListener('mouseout',   this.onMouseOut.bind(this), true);
	
	// aint no multi touch just yet!
	target.view.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	target.view.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	target.view.addEventListener("touchmove", this.onTouchMove.bind(this), true);
}

/**
 * updates the state of interactive objects
 *
 * @method update
 * @private
 */
PIXI.InteractionManager.prototype.update = function()
{
	if(!this.target)return;
	
	// frequency of 30fps??
	var now = Date.now();
	var diff = now - this.last;
	diff = (diff * 30) / 1000;
	if(diff < 1)return;
	this.last = now;
	//
	
	// ok.. so mouse events??
	// yes for now :)
	// OPTIMSE - how often to check??
	if(this.dirty)
	{
		this.dirty = false;
		
		var len = this.interactiveItems.length;
		
		for (var i=0; i < len; i++) {
		  this.interactiveItems[i].interactiveChildren = false;
		}
		
		this.interactiveItems = [];
		
		if(this.stage.interactive)this.interactiveItems.push(this.stage);
		// go through and collect all the objects that are interactive..
		this.collectInteractiveSprite(this.stage, this.stage);
	}
	
	// loop through interactive objects!
	var length = this.interactiveItems.length;
	
	this.target.view.style.cursor = "default";	
				
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		
		//if(!item.visible)continue;
		
		// OPTIMISATION - only calculate every time if the mousemove function exists..
		// OK so.. does the object have any other interactive functions?
		// hit-test the clip!
		
		
		if(item.mouseover || item.mouseout || item.buttonMode)
		{
			// ok so there are some functions so lets hit test it..
			item.__hit = this.hitTest(item, this.mouse);
			this.mouse.target = item;
			// ok so deal with interactions..
			// loks like there was a hit!
			if(item.__hit)
			{
				if(item.buttonMode)this.target.view.style.cursor = "pointer";	
				
				if(!item.__isOver)
				{
					
					if(item.mouseover)item.mouseover(this.mouse);
					item.__isOver = true;	
				}
			}
			else
			{
				if(item.__isOver)
				{
					// roll out!
					if(item.mouseout)item.mouseout(this.mouse);
					item.__isOver = false;	
				}
			}
		}
		
		// --->
	}
}

/**
 * Is called when the mouse moves accross the renderer element
 *
 * @method onMouseMove
 * @param event {Event} The DOM event of the mouse moving
 * @private
 */
PIXI.InteractionManager.prototype.onMouseMove = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	// TODO optimize by not check EVERY TIME! maybe half as often? //
	var rect = this.target.view.getBoundingClientRect();
	
	this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
	this.mouse.global.y = (event.clientY - rect.top) * ( this.target.height / rect.height);
	
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousemove)
		{
			//call the function!
			item.mousemove(this.mouse);
		}
	}
}

/**
 * Is called when the mouse button is pressed down on the renderer element
 *
 * @method onMouseDown
 * @param event {Event} The DOM event of a mouse button being pressed down
 * @private
 */
PIXI.InteractionManager.prototype.onMouseDown = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
	// loop through inteaction tree...
	// hit test each item! -> 
	// get interactive items under point??
	//stage.__i
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	var index = 0;
	var parent = this.stage;
	
	// while 
	// hit test 
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousedown || item.click)
		{
			item.__mouseIsDown = true;
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit)
			{
				//call the function!
				if(item.mousedown)item.mousedown(this.mouse);
				item.__isDown = true;
				
				// just the one!
				if(!item.interactiveChildren)break;
			}
		}
	}
}


PIXI.InteractionManager.prototype.onMouseOut = function(event)
{
	var length = this.interactiveItems.length;
	
	this.target.view.style.cursor = "default";	
				
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.__isOver)
		{
			this.mouse.target = item;
			if(item.mouseout)item.mouseout(this.mouse);
			item.__isOver = false;	
		}
	}
}

/**
 * Is called when the mouse button is released on the renderer element
 *
 * @method onMouseUp
 * @param event {Event} The DOM event of a mouse button being released
 * @private
 */
PIXI.InteractionManager.prototype.onMouseUp = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
	var global = this.mouse.global;
	
	
	var length = this.interactiveItems.length;
	var up = false;
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mouseup || item.mouseupoutside || item.click)
		{
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit && !up)
			{
				//call the function!
				if(item.mouseup)
				{
					item.mouseup(this.mouse);
				}
				if(item.__isDown)
				{
					if(item.click)item.click(this.mouse);
				}
				
				if(!item.interactiveChildren)up = true;
			}
			else
			{
				if(item.__isDown)
				{
					if(item.mouseupoutside)item.mouseupoutside(this.mouse);
				}
			}
		
			item.__isDown = false;	
		}
	}
}

/**
 * Tests if the current mouse coords hit a sprite
 *
 * @method hitTest
 * @param item {DisplayObject} The displayObject to test for a hit
 * @param interactionData {InteractionData} The interactiondata object to update in the case of a hit
 * @private
 */
PIXI.InteractionManager.prototype.hitTest = function(item, interactionData)
{
	var global = interactionData.global;
	
	if(item.vcount !== PIXI.visibleCount)return false;

	var isSprite = (item instanceof PIXI.Sprite),
		worldTransform = item.worldTransform,
		a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
		a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
		id = 1 / (a00 * a11 + a01 * -a10),
		x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
		y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;

	interactionData.target = item;
	
	//a sprite or display object with a hit area defined
	if(item.hitArea && item.hitArea.contains) {
		if(item.hitArea.contains(x, y)) {
			//if(isSprite)
			interactionData.target = item;

			return true;
		}
		
		return false;
	}
	// a sprite with no hitarea defined
	else if(isSprite)
	{
		var width = item.texture.frame.width,
			height = item.texture.frame.height,
			x1 = -width * item.anchor.x,
			y1;
		
		if(x > x1 && x < x1 + width)
		{
			y1 = -height * item.anchor.y;
		
			if(y > y1 && y < y1 + height)
			{
				// set the target property if a hit is true!
				interactionData.target = item
				return true;
			}
		}
	}

	var length = item.children.length;
	
	for (var i = 0; i < length; i++)
	{
		var tempItem = item.children[i];
		var hit = this.hitTest(tempItem, interactionData);
		if(hit)
		{
			// hmm.. TODO SET CORRECT TARGET?
			interactionData.target = item
			return true;
		}
	}

	return false;	
}

/**
 * Is called when a touch is moved accross the renderer element
 *
 * @method onTouchMove
 * @param event {Event} The DOM event of a touch moving accross the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchMove = function(event)
{
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		touchData.originalEvent =  event || window.event;
		
		// update the touch position
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
	}
	
	var length = this.interactiveItems.length;
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(item.touchmove)item.touchmove(touchData);
	}
}

/**
 * Is called when a touch is started on the renderer element
 *
 * @method onTouchStart
 * @param event {Event} The DOM event of a touch starting on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchStart = function(event)
{
	var rect = this.target.view.getBoundingClientRect();
	
	var changedTouches = event.changedTouches;
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.pool.pop();
		if(!touchData)touchData = new PIXI.InteractionData();
		
		touchData.originalEvent =  event || window.event;
		
		this.touchs[touchEvent.identifier] = touchData;
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		var length = this.interactiveItems.length;
		
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			
			if(item.touchstart || item.tap)
			{
				item.__hit = this.hitTest(item, touchData);
				
				if(item.__hit)
				{
					//call the function!
					if(item.touchstart)item.touchstart(touchData);
					item.__isDown = true;
					item.__touchData = touchData;
					
					if(!item.interactiveChildren)break;
				}
			}
		}
	}
}

/**
 * Is called when a touch is ended on the renderer element
 *
 * @method onTouchEnd
 * @param event {Event} The DOM event of a touch ending on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchEnd = function(event)
{
	//this.mouse.originalEvent = event || window.event; //IE uses window.event
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		var up = false;
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		var length = this.interactiveItems.length;
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			var itemTouchData = item.__touchData; // <-- Here!
			item.__hit = this.hitTest(item, touchData);
		
			if(itemTouchData == touchData)
			{
				// so this one WAS down...
				touchData.originalEvent =  event || window.event;
				// hitTest??
				
				if(item.touchend || item.tap)
				{
					if(item.__hit && !up)
					{
						if(item.touchend)item.touchend(touchData);
						if(item.__isDown)
						{
							if(item.tap)item.tap(touchData);
						}
						
						if(!item.interactiveChildren)up = true;
					}
					else
					{
						if(item.__isDown)
						{
							if(item.touchendoutside)item.touchendoutside(touchData);
						}
					}
					
					item.__isDown = false;
				}
				
				item.__touchData = null;
					
			}
			else
			{
				
			}
		}
		// remove the touch..
		this.pool.push(touchData);
		this.touchs[touchEvent.identifier] = null;
	}
}

/**
 * Holds all information related to an Interaction event
 *
 * @class InteractionData
 * @constructor
 */
PIXI.InteractionData = function()
{
	/**
	 * This point stores the global coords of where the touch/mouse event happened
	 *
	 * @property global 
	 * @type Point
	 */
	this.global = new PIXI.Point();
	
	// this is here for legacy... but will remove
	this.local = new PIXI.Point();

	/**
	 * The target Sprite that was interacted with
	 *
	 * @property target
	 * @type Sprite
	 */
	this.target;

	/**
	 * When passed to an event handler, this will be the original DOM Event that was captured
	 *
	 * @property originalEvent
	 * @type Event
	 */
	this.originalEvent;
}

/**
 * This will return the local coords of the specified displayObject for this InteractionData
 *
 * @method getLocalPosition
 * @param displayObject {DisplayObject} The DisplayObject that you would like the local coords off
 * @return {Point} A point containing the coords of the InteractionData position relative to the DisplayObject
 */
PIXI.InteractionData.prototype.getLocalPosition = function(displayObject)
{
	var worldTransform = displayObject.worldTransform;
	var global = this.global;
	
	// do a cheeky transform to get the mouse coords;
	var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
        a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
        id = 1 / (a00 * a11 + a01 * -a10);
	// set the mouse coords...
	return new PIXI.Point(a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
							   a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id)
}

// constructor
PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* @namespace Phaser
*/
var Phaser = Phaser || {

	VERSION: '<%= version %>',
	GAMES: [],
	AUTO: 0,
	CANVAS: 1,
	WEBGL: 2,

	SPRITE: 0,
	BUTTON: 1,
	BULLET: 2,
	GRAPHICS: 3,
	TEXT: 4,
	TILESPRITE: 5,
	BITMAPTEXT: 6,
	GROUP: 7,
	RENDERTEXTURE: 8,
	TILEMAP: 9,
	TILEMAPLAYER: 10,
	EMITTER: 11,

	NONE: 0,
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4

 };

PIXI.InteractionManager = function (dummy) {
	//	We don't need this in Pixi, so we've removed it to save space
	//	however the Stage object expects a reference to it, so here is a dummy entry.
};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
* The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
*
* @class Phaser.Camera
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
* @param {number} id - Not being used at the moment, will be when Phaser supports multiple camera
* @param {number} x - Position of the camera on the X axis
* @param {number} y - Position of the camera on the Y axis
* @param {number} width - The width of the view rectangle
* @param {number} height - The height of the view rectangle
*/
Phaser.Camera = function (game, id, x, y, width, height) {
    
	/**
	* @property {Phaser.Game} game - A reference to the currently running Game.
	*/
	this.game = game;

	/**
	* @property {Phaser.World} world - A reference to the game world.
	*/
	this.world = game.world;

	/**
	* @property {number} id - Reserved for future multiple camera set-ups.
	* @default
	*/
	this.id = 0; 

	/**
	* Camera view. 
	* The view into the world we wish to render (by default the game dimensions).
    * The x/y values are in world coordinates, not screen coordinates, the width/height is how many pixels to render.
    * Objects outside of this view are not rendered (unless set to ignore the Camera, i.e. UI?).
	* @property {Phaser.Rectangle} view
	*/
    this.view = new Phaser.Rectangle(x, y, width, height);

    /**
	* @property {Phaser.Rectangle} screenView - Used by Sprites to work out Camera culling.
	*/
	this.screenView = new Phaser.Rectangle(x, y, width, height);

    /**
    * The Camera is bound to this Rectangle and cannot move outside of it. By default it is enabled and set to the size of the World.
    * The Rectangle can be located anywhere in the world and updated as often as you like. If you don't wish the Camera to be bound
    * at all then set this to null. The values can be anything and are in World coordinates, with 0,0 being the center of the world.
    * @property {Phaser.Rectangle} bounds - The Rectangle in which the Camera is bounded. Set to null to allow for movement anywhere.
    */
    this.bounds = new Phaser.Rectangle(x, y, width, height);

    /**
	* @property {Phaser.Rectangle} deadzone - Moving inside this Rectangle will not cause camera moving.
	*/
    this.deadzone = null;

	/**
	* @property {boolean} visible - Whether this camera is visible or not.
	* @default
	*/
    this.visible = true;

	/**
	* @property {boolean} atLimit - Whether this camera is flush with the World Bounds or not.
    */
    this.atLimit = { x: false, y: false };

	/**
	* @property {Phaser.Sprite} target - If the camera is tracking a Sprite, this is a reference to it, otherwise null.
    * @default
    */
    this.target = null;

	/**
	* @property {number} edge - Edge property.
    * @private
    * @default
    */
    this._edge = 0;

    this.displayObject = null;
	
};

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_LOCKON = 0;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_PLATFORMER = 1;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_TOPDOWN = 2;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_TOPDOWN_TIGHT = 3;

Phaser.Camera.prototype = {

	/**
    * Tells this camera which sprite to follow.
    * @method Phaser.Camera#follow
    * @param {Phaser.Sprite} target - The object you want the camera to track. Set to null to not follow anything.
    * @param {number} [style] Leverage one of the existing "deadzone" presets. If you use a custom deadzone, ignore this parameter and manually specify the deadzone after calling follow().
    */
    follow: function (target, style) {

        if (typeof style === "undefined") { style = Phaser.Camera.FOLLOW_LOCKON; }

        this.target = target;

        var helper;

        switch (style) {

            case Phaser.Camera.FOLLOW_PLATFORMER:
                var w = this.width / 8;
                var h = this.height / 3;
                this.deadzone = new Phaser.Rectangle((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN:
                helper = Math.max(this.width, this.height) / 4;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN_TIGHT:
                helper = Math.max(this.width, this.height) / 8;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_LOCKON:
            default:
                this.deadzone = null;
                break;
        }

    },

    /**
    * Move the camera focus on a display object instantly.
    * @method Phaser.Camera#focusOn
    * @param {any} displayObject - The display object to focus the camera on. Must have visible x/y properties.
    */
    focusOn: function (displayObject) {

        this.setPosition(Math.round(displayObject.x - this.view.halfWidth), Math.round(displayObject.y - this.view.halfHeight));

    },

	/**
    * Move the camera focus on a location instantly.
    * @method Phaser.Camera#focusOnXY
    * @param {number} x - X position.
    * @param {number} y - Y position.
    */
    focusOnXY: function (x, y) {

        this.setPosition(Math.round(x - this.view.halfWidth), Math.round(y - this.view.halfHeight));

    },

	/**
    * Update focusing and scrolling.
    * @method Phaser.Camera#update
    */
    update: function () {

        if (this.target)
        {
            this.updateTarget();
        }

        if (this.bounds)
        {
            this.checkBounds();
        }

        if (this.view.x !== -this.displayObject.position.x)
        {
            this.displayObject.position.x = -this.view.x;
        }

        if (this.view.y !== -this.displayObject.position.y)
        {
            this.displayObject.position.y = -this.view.y;
        }

    },

    updateTarget: function () {

        if (this.deadzone)
        {
            this._edge = this.target.x - this.deadzone.x;

            if (this.view.x > this._edge)
            {
                this.view.x = this._edge;
            }

            this._edge = this.target.x + this.target.width - this.deadzone.x - this.deadzone.width;

            if (this.view.x < this._edge)
            {
                this.view.x = this._edge;
            }

            this._edge = this.target.y - this.deadzone.y;

            if (this.view.y > this._edge)
            {
                this.view.y = this._edge;
            }

            this._edge = this.target.y + this.target.height - this.deadzone.y - this.deadzone.height;

            if (this.view.y < this._edge)
            {
                this.view.y = this._edge;
            }
        }
        else
        {
            this.focusOnXY(this.target.x, this.target.y);
        }

    },

    setBoundsToWorld: function () {

        this.bounds.setTo(this.game.world.x, this.game.world.y, this.game.world.width, this.game.world.height);

    },

    /**
    * Method called to ensure the camera doesn't venture outside of the game world.
    * @method Phaser.Camera#checkWorldBounds
    */
    checkBounds: function () {

        this.atLimit.x = false;
        this.atLimit.y = false;

        //  Make sure we didn't go outside the cameras bounds
        if (this.view.x < this.bounds.x)
        {
            this.atLimit.x = true;
            this.view.x = this.bounds.x;
        }

        if (this.view.x > this.bounds.right - this.width)
        {
            this.atLimit.x = true;
            this.view.x = (this.bounds.right - this.width) + 1;
        }

        if (this.view.y < this.bounds.top)
        {
            this.atLimit.y = true;
            this.view.y = this.bounds.top;
        }

        if (this.view.y > this.bounds.bottom - this.height)
        {
            this.atLimit.y = true;
            this.view.y = (this.bounds.bottom - this.height) + 1;
        }

        this.view.floor();

    },

    /**
    * A helper function to set both the X and Y properties of the camera at once
    * without having to use game.camera.x and game.camera.y.
    * 
    * @method Phaser.Camera#setPosition
    * @param {number} x - X position.
    * @param {number} y - Y position.
    */
    setPosition: function (x, y) {

        this.view.x = x;
        this.view.y = y;

        if (this.bounds)
        {
            this.checkBounds();
        }

    },

    /**
    * Sets the size of the view rectangle given the width and height in parameters.
    * 
    * @method Phaser.Camera#setSize
    * @param {number} width - The desired width.
    * @param {number} height - The desired height.
    */
    setSize: function (width, height) {

        this.view.width = width;
        this.view.height = height;

    }

};

/**
* The Cameras x coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#x
* @property {number} x - Gets or sets the cameras x position.
*/
Object.defineProperty(Phaser.Camera.prototype, "x", {

    get: function () {
        return this.view.x;
    },
 
    set: function (value) {

        this.view.x = value;

        if (this.bounds)
        {
            this.checkBounds();
        }
    }

});

/**
* The Cameras y coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#y
* @property {number} y - Gets or sets the cameras y position.
*/
Object.defineProperty(Phaser.Camera.prototype, "y", {
	
    get: function () {
        return this.view.y;
    },

    set: function (value) {

        this.view.y = value;

        if (this.bounds)
        {
            this.checkBounds();
        }
    }

});

/**
* The Cameras width. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#width
* @property {number} width - Gets or sets the cameras width.
*/
Object.defineProperty(Phaser.Camera.prototype, "width", {

    get: function () {
        return this.view.width;
    },

    set: function (value) {
        this.view.width = value;
    }

});

/**
* The Cameras height. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#height
* @property {number} height - Gets or sets the cameras height.
*/
Object.defineProperty(Phaser.Camera.prototype, "height", {

    get: function () {
        return this.view.height;
    },

    set: function (value) {
        this.view.height = value;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The State Manager is responsible for loading, setting up and switching game states.
*
* @class Phaser.StateManager
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {Phaser.State|Object} [pendingState=null] - A State object to seed the manager with.
*/
Phaser.StateManager = function (game, pendingState) {

	/**
	* A reference to the currently running game.
	* @property {Phaser.Game} game.
	*/
	this.game = game;

	/**
	* Description.
	* @property {Description} states.
	*/
	this.states = {};

	if (pendingState !== null)
	{
		this._pendingState = pendingState;
	}

};

Phaser.StateManager.prototype = {

	/**
	* A reference to the currently running game.
	* @property {Phaser.Game} game.
	*/
	game: null,

	/**
	* The state to be switched to in the next frame.
	* @property {State} _pendingState
	* @private
	*/
	_pendingState: null,

	/**
	* Flag that sets if the State has been created or not.
	* @property {boolean}_created
	* @private
	*/
	_created: false,

	/**
	* The state to be switched to in the next frame.
	* @property {Description} states
	*/
	states: {},

	/**
	* The current active State object (defaults to null).
	* @property {string} current
	*/
	current: '',

	/**
	* This will be called when the state is started (i.e. set as the current active state).
	* @property {function} onInitCallback
	*/
	onInitCallback: null,

	/**
	* This will be called when init states (loading assets...).
	* @property {function} onPreloadCallback
	*/
	onPreloadCallback: null,

	/**
	* This will be called when create states (setup states...).
	* @property {function} onCreateCallback
	*/
	onCreateCallback: null,

	/**
	* This will be called when State is updated, this doesn't happen during load (@see onLoadUpdateCallback).
	* @property {function} onUpdateCallback
	*/
	onUpdateCallback: null,

	/**
	* This will be called when the State is rendered, this doesn't happen during load (see onLoadRenderCallback).
	* @property {function} onRenderCallback
	*/
	onRenderCallback: null,

	/**
	* This will be called before the State is rendered and before the stage is cleared.
	* @property {function} onPreRenderCallback
	*/
	onPreRenderCallback: null,

	/**
	* This will be called when the State is updated but only during the load process.
	* @property {function} onLoadUpdateCallback
	*/
	onLoadUpdateCallback: null,

	/**
	* This will be called when the State is rendered but only during the load process.
	* @property {function} onLoadRenderCallback
	*/
	onLoadRenderCallback: null,

	/**
	* This will be called when states paused.
	* @property {function} onPausedCallback
	*/
	onPausedCallback: null,

	/**
	* This will be called when the state is shut down (i.e. swapped to another state).
	* @property {function} onShutDownCallback
	*/
	onShutDownCallback: null,

	/**
	* Description.
	* @method Phaser.StateManager#boot
	* @private
	*/
	boot: function () {

		// console.log('Phaser.StateManager.boot');

		if (this._pendingState !== null)
		{
			// console.log('_pendingState found');
			// console.log(typeof this._pendingState);

			if (typeof this._pendingState === 'string')
			{
				//	State was already added, so just start it
				this.start(this._pendingState, false, false);
			}
			else
			{
				this.add('default', this._pendingState, true);
			}

		}

	},

	/**
    * Add a new State.
    * @method Phaser.StateManager#add
    * @param key {string} - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    * @param state {State} - The state you want to switch to.
    * @param autoStart {boolean} - Start the state immediately after creating it? (default true)
    */
    add: function (key, state, autoStart) {

        if (typeof autoStart === "undefined") { autoStart = false; }

		// console.log('Phaser.StateManager.addState', key);
		// console.log(typeof state);
		// console.log('autoStart?', autoStart);

		var newState;

		if (state instanceof Phaser.State)
		{
			// console.log('Phaser.StateManager.addState: Phaser.State given');
			newState = state;
		}
		else if (typeof state === 'object')
		{
			// console.log('Phaser.StateManager.addState: Object given');
			newState = state;
			newState.game = this.game;
		}
		else if (typeof state === 'function')
		{
			// console.log('Phaser.StateManager.addState: Function given');
			newState = new state(this.game);
		}

		this.states[key] = newState;

		if (autoStart)
		{
			if (this.game.isBooted)
			{
				// console.log('Game is booted, so we can start the state now');
				this.start(key);
			}
			else
			{
				// console.log('Game is NOT booted, so set the current state as pending');
				this._pendingState = key;
			}
		}

		return newState;

    },

	/**
     * Delete the given state.
     * @method Phaser.StateManager#remove
     * @param {string} key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
     */
    remove: function (key) {

    	if (this.current == key)
    	{
	        this.callbackContext = null;

	        this.onInitCallback = null;
	        this.onShutDownCallback = null;

	        this.onPreloadCallback = null;
	        this.onLoadRenderCallback = null;
	        this.onLoadUpdateCallback = null;
	        this.onCreateCallback = null;
	        this.onUpdateCallback = null;
	        this.onRenderCallback = null;
	        this.onPausedCallback = null;
	        this.onDestroyCallback = null;
    	}

    	delete this.states[key];

    },

	/**
    * Start the given state
    * @method Phaser.StateManager#start
    * @param {string} key - The key of the state you want to start.
    * @param {boolean} [clearWorld] - clear everything in the world? (Default to true)
    * @param {boolean} [clearCache] - clear asset cache? (Default to false and ONLY available when clearWorld=true)
    */
    start: function (key, clearWorld, clearCache) {

    	// console.log('Phaser.StateManager.start', key);
    	// console.log(this);
    	// console.log(this.callbackContext);

        if (typeof clearWorld === "undefined") { clearWorld = true; }
        if (typeof clearCache === "undefined") { clearCache = false; }

        if (this.game.isBooted == false)
        {
			// console.log('Game is NOT booted, so set the requested state as pending');
			this._pendingState = key;
			return;
        }

		if (this.checkState(key) == false)
		{
			return;
		}
		else
		{
			//	Already got a state running?
			if (this.current)
			{
				this.onShutDownCallback.call(this.callbackContext);
			}

	        if (clearWorld)
	        {
				//this.game.tweens.removeAll();

	            this.game.world.destroy();

	            if (clearCache == true)
	            {
	                this.game.cache.destroy();
	            }
	        }

			this.setCurrentState(key);
		}

        if (this.onPreloadCallback)
        {
	    	// console.log('Preload Callback found');
            this.game.load.reset();
            this.onPreloadCallback.call(this.callbackContext);

            //  Is the loader empty?
            if (this.game.load.queueSize == 0)
            {
		    	// console.log('Loader queue empty');
                this.game.loadComplete();
            }
            else
            {
		    	// console.log('Loader started');
                //  Start the loader going as we have something in the queue
                this.game.load.start();
            }
        }
        else
        {
			// console.log('Preload callback not found');
            //  No init? Then there was nothing to load either
            this.game.loadComplete();
        }

    },

	/**
	* Used by onInit and onShutdown when those functions don't exist on the state
    * @method Phaser.StateManager#dummy
    * @private
    */
    dummy: function () {
    },

	/**
    * Description.
    * @method Phaser.StateManager#checkState
    * @param {string} key - The key of the state you want to check.
    * @return {boolean} Description.
    */
    checkState: function (key) {

		if (this.states[key])
		{
			var valid = false;

			if (this.states[key]['preload']) { valid = true; }

			if (valid == false && this.states[key]['loadRender']) { valid = true; }
			if (valid == false && this.states[key]['loadUpdate']) { valid = true; }
			if (valid == false && this.states[key]['create']) { valid = true; }
			if (valid == false && this.states[key]['update']) { valid = true; }
			if (valid == false && this.states[key]['preRender']) { valid = true; }
			if (valid == false && this.states[key]['render']) { valid = true; }
			if (valid == false && this.states[key]['paused']) { valid = true; }

        	if (valid == false)
        	{
	            console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions.");
	            return false;
	        }

			return true;
		}
		else
		{
			console.warn("Phaser.StateManager - No state found with the key: " + key);
			return false;
		}

    },

	/**
    * Links game properties to the State given by the key.
    * @method Phaser.StateManager#link
    * @param {string} key - State key.
    * @protected
    */
    link: function (key) {

		// console.log('linked');
        this.states[key].game = this.game;
        this.states[key].add = this.game.add;
        this.states[key].camera = this.game.camera;
        this.states[key].cache = this.game.cache;
        this.states[key].input = this.game.input;
        this.states[key].load = this.game.load;
        this.states[key].math = this.game.math;
        //this.states[key].sound = this.game.sound;
        this.states[key].stage = this.game.stage;
        this.states[key].time = this.game.time;
        //this.states[key].tweens = this.game.tweens;
        this.states[key].world = this.game.world;
        //this.states[key].particles = this.game.particles;
        this.states[key].physics = this.game.physics;
        this.states[key].rnd = this.game.rnd;

    },

	/**
    * Sets the current State. Should not be called directly (use StateManager.start)
    * @method Phaser.StateManager#setCurrentState
    * @param {string} key - State key.
    * @protected
    */
	setCurrentState: function (key) {

        this.callbackContext = this.states[key];

        this.link(key);

        //	Used when the state is set as being the current active state
        this.onInitCallback = this.states[key]['init'] || this.dummy;

        this.onPreloadCallback = this.states[key]['preload'] || null;
        this.onLoadRenderCallback = this.states[key]['loadRender'] || null;
        this.onLoadUpdateCallback = this.states[key]['loadUpdate'] || null;
        this.onCreateCallback = this.states[key]['create'] || null;
        this.onUpdateCallback = this.states[key]['update'] || null;
        this.onPreRenderCallback = this.states[key]['preRender'] || null;
        this.onRenderCallback = this.states[key]['render'] || null;
        this.onPausedCallback = this.states[key]['paused'] || null;

        //	Used when the state is no longer the current active state
        this.onShutDownCallback = this.states[key]['shutdown'] || this.dummy;

		this.current = key;
		this._created = false;

		this.onInitCallback.call(this.callbackContext);

	},

	/**
	* @method Phaser.StateManager#loadComplete
    * @protected
	*/
    loadComplete: function () {

		// console.log('Phaser.StateManager.loadComplete');

        if (this._created == false && this.onCreateCallback)
        {
			// console.log('Create callback found');
	        this._created = true;
            this.onCreateCallback.call(this.callbackContext);
        }
        else
        {
	        this._created = true;
        }

    },

	/**
	* @method Phaser.StateManager#update
    * @protected
	*/
    update: function () {

    	if (this._created && this.onUpdateCallback)
    	{
			this.onUpdateCallback.call(this.callbackContext);
    	}
    	else
    	{
		    if (this.onLoadUpdateCallback)
		    {
		    	this.onLoadUpdateCallback.call(this.callbackContext);
			}
		}

    },

	/**
	* @method Phaser.StateManager#preRender
    * @protected
	*/
    preRender: function () {

	    if (this.onPreRenderCallback)
	    {
	    	this.onPreRenderCallback.call(this.callbackContext);
		}

    },

	/**
	* @method Phaser.StateManager#render
    * @protected
	*/
    render: function () {

    	if (this._created && this.onRenderCallback)
    	{
			this.onRenderCallback.call(this.callbackContext);
    	}
    	else
    	{
		    if (this.onLoadRenderCallback)
		    {
		    	this.onLoadRenderCallback.call(this.callbackContext);
			}
		}

    },

	/**
    * Nuke the entire game from orbit
    * @method Phaser.StateManager#destroy
    */
    destroy: function () {

        this.callbackContext = null;

        this.onInitCallback = null;
        this.onShutDownCallback = null;

        this.onPreloadCallback = null;
        this.onLoadRenderCallback = null;
        this.onLoadUpdateCallback = null;
        this.onCreateCallback = null;
        this.onUpdateCallback = null;
        this.onRenderCallback = null;
        this.onPausedCallback = null;
        this.onDestroyCallback = null;

        this.game = null;
        this.states = {};
        this._pendingState = null;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* @class Phaser.Signal
* @classdesc A Signal is used for object communication via a custom broadcaster instead of Events.
* @author Miller Medeiros http://millermedeiros.github.com/js-signals/
* @constructor
*/
Phaser.Signal = function () {

	/**
	* @property {Array.<Phaser.SignalBinding>} _bindings - Description.
	* @private
	*/
	this._bindings = [];
	
	/**
	* @property {Description} _prevParams - Description.
	* @private
	*/
	this._prevParams = null;

	// enforce dispatch to aways work on same context (#47)
	var self = this;

	/**
	* @property {Description} dispatch - Description.
	*/
	this.dispatch = function(){
		Phaser.Signal.prototype.dispatch.apply(self, arguments);
	};

};

Phaser.Signal.prototype = {

	/**
    * If Signal should keep record of previously dispatched parameters and
	* automatically execute listener during `add()`/`addOnce()` if Signal was
	* already dispatched before.
	* @property {boolean} memorize
	*/
	memorize: false,

	/**
	* @property {boolean} _shouldPropagate 
	* @private
	*/
	_shouldPropagate: true,

	/**
	* If Signal is active and should broadcast events.
	* <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
	* @property {boolean} active
    * @default
    */
	active: true,

	/**
	* @method Phaser.Signal#validateListener
	* @param {function} listener - Signal handler function.
	* @param {Description} fnName - Description.
	* @private
    */
	validateListener: function (listener, fnName) {
		if (typeof listener !== 'function') {
			throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
		}
	},

	/**
	 * @method Phaser.Signal#_registerListener
	 * @param {function} listener - Signal handler function.
	 * @param {boolean} isOnce - Description.
	 * @param {object} [listenerContext] - Description.
	 * @param {number} [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0).
	 * @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
	 * @private
	 */
	_registerListener: function (listener, isOnce, listenerContext, priority) {

		var prevIndex = this._indexOfListener(listener, listenerContext),
			binding;

		if (prevIndex !== -1) {
			binding = this._bindings[prevIndex];
			if (binding.isOnce() !== isOnce) {
				throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
			}
		} else {
			binding = new Phaser.SignalBinding(this, listener, isOnce, listenerContext, priority);
			this._addBinding(binding);
		}

		if (this.memorize && this._prevParams){
			binding.execute(this._prevParams);
		}

		return binding;
	},

	/**
	 * @method Phaser.Signal#_addBinding 
	 * @param {Phaser.SignalBinding} binding - An Object representing the binding between the Signal and listener.
	 * @private
	 */
	_addBinding: function (binding) {
		//simplified insertion sort
		var n = this._bindings.length;
		do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
		this._bindings.splice(n + 1, 0, binding);
	},

	/**
	 * @method Phaser.Signal#_indexOfListener
	 * @param {function} listener - Signal handler function.
	 * @return {number} Description.
	 * @private
	 */
	_indexOfListener: function (listener, context) {
		var n = this._bindings.length,
			cur;
		while (n--) {
			cur = this._bindings[n];
			if (cur._listener === listener && cur.context === context) {
				return n;
			}
		}
		return -1;
	},

	/**
	 * Check if listener was attached to Signal.
	 * 
	 * @method Phaser.Signal#has
	 * @param {Function} listener - Signal handler function.
	 * @param {Object} [context] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	 * @return {boolean} If Signal has the specified listener.
	 */
	has: function (listener, context) {
		return this._indexOfListener(listener, context) !== -1;
	},

	/**
	 * Add a listener to the signal.
	 * 
	 * @method Phaser.Signal#add
	 * @param {function} listener - Signal handler function.
	 * @param {object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	 * @param {number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0).
	 * @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
	 */
	add: function (listener, listenerContext, priority) {
		this.validateListener(listener, 'add');
		return this._registerListener(listener, false, listenerContext, priority);
	},

	/**
	* Add listener to the signal that should be removed after first execution (will be executed only once).
	*
	* @method Phaser.Signal#addOnce
	* @param {function} listener Signal handler function.
	* @param {object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	* @param {number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
	* @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
	*/
	addOnce: function (listener, listenerContext, priority) {
		this.validateListener(listener, 'addOnce');
		return this._registerListener(listener, true, listenerContext, priority);
	},

	/**
	* Remove a single listener from the dispatch queue.
	*
	* @method Phaser.Signal#remove
	* @param {function} listener Handler function that should be removed.
	* @param {object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
	* @return {function} Listener handler function.
	*/
	remove: function (listener, context) {

		this.validateListener(listener, 'remove');

		var i = this._indexOfListener(listener, context);

		if (i !== -1)
		{
			this._bindings[i]._destroy(); //no reason to a Phaser.SignalBinding exist if it isn't attached to a signal
			this._bindings.splice(i, 1);
		}

		return listener;

	},

	/**
	* Remove all listeners from the Signal.
	*
	* @method Phaser.Signal#removeAll
	*/
	removeAll: function () {
		var n = this._bindings.length;
		while (n--) {
			this._bindings[n]._destroy();
		}
		this._bindings.length = 0;
	},

	/**
	* Gets the total number of listeneres attached to ths Signal.
	*
	* @method Phaser.Signal#getNumListeners
	* @return {number} Number of listeners attached to the Signal.
	*/
	getNumListeners: function () {
		return this._bindings.length;
	},

	/**
	* Stop propagation of the event, blocking the dispatch to next listeners on the queue.
	* <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
	* @see Signal.prototype.disable
	*
	* @method Phaser.Signal#halt
	*/
	halt: function () {
		this._shouldPropagate = false;
	},

	/**
	* Dispatch/Broadcast Signal to all listeners added to the queue.
	*
	* @method Phaser.Signal#dispatch
	* @param {any} [params] - Parameters that should be passed to each handler.
	*/
	dispatch: function (params) {
		if (! this.active) {
			return;
		}

		var paramsArr = Array.prototype.slice.call(arguments),
			n = this._bindings.length,
			bindings;

		if (this.memorize) {
			this._prevParams = paramsArr;
		}

		if (! n) {
			//should come after memorize
			return;
		}

		bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
		this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

		//execute all callbacks until end of the list or until a callback returns `false` or stops propagation
		//reverse loop since listeners with higher priority will be added at the end of the list
		do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
	},

	/**
	* Forget memorized arguments.
	* @see Signal.memorize
	*
	* @method Phaser.Signal#forget
 	*/
	forget: function(){
		this._prevParams = null;
	},

	/**
	* Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
	* <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
	*
	* @method Phaser.Signal#dispose
	*/
	dispose: function () {
		this.removeAll();
		delete this._bindings;
		delete this._prevParams;
	},

	/**
	*
	* @method Phaser.Signal#toString
	* @return {string} String representation of the object.
	*/
	toString: function () {
		return '[Phaser.Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
	}

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser.SignalBinding
*
* Object that represents a binding between a Signal and a listener function.
* <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
* <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
*
* @class Phaser.SignalBinding
* @name SignalBinding
* @author Miller Medeiros http://millermedeiros.github.com/js-signals/
* @constructor
* @inner
* @param {Signal} signal - Reference to Signal object that listener is currently bound to.
* @param {function} listener - Handler function bound to the signal.
* @param {boolean} isOnce - If binding should be executed just once.
* @param {object} [listenerContext] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
* @param {number} [priority] - The priority level of the event listener. (default = 0).
*/
Phaser.SignalBinding = function (signal, listener, isOnce, listenerContext, priority) {

    /**
	* @property {Phaser.Game} _listener - Handler function bound to the signal.
	* @private
	*/
    this._listener = listener;

    /**
	* @property {boolean} _isOnce - If binding should be executed just once.
	* @private
	*/
    this._isOnce = isOnce;

    /**
	* @property {object|undefined|null} context - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	* @memberof SignalBinding.prototype
	*/
    this.context = listenerContext;

    /**
	* @property {Signal} _signal - Reference to Signal object that listener is currently bound to.
	* @private
	*/
    this._signal = signal;

    /**
	* @property {number} _priority - Listener priority.
	* @private
	*/
    this._priority = priority || 0;

};

Phaser.SignalBinding.prototype = {

    /**
    * If binding is active and should be executed.
    * @property {boolean} active
    * @default
    */ 
    active: true,

    /**
    * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute` (curried parameters).
    * @property {array|null} params 
    * @default 
    */
    params: null,

    /**
    * Call listener passing arbitrary parameters.
    * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
    * @method Phaser.SignalBinding#execute
    * @param {array} [paramsArr] - Array of parameters that should be passed to the listener.
    * @return {Description} Value returned by the listener.
    */
    execute: function (paramsArr) {

        var handlerReturn, params;

        if (this.active && !!this._listener)
        {
            params = this.params? this.params.concat(paramsArr) : paramsArr;
            handlerReturn = this._listener.apply(this.context, params);

            if (this._isOnce)
            {
                this.detach();
            }
        }

        return handlerReturn;

    },

    /**
    * Detach binding from signal.
    * <p>alias to: @see mySignal.remove(myBinding.getListener());
    * @method Phaser.SignalBinding#detach
    * @return {function|null} Handler function bound to the signal or `null` if binding was previously detached.
    */
    detach: function () {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    },

    /**
    * @method Phaser.SignalBinding#isBound
    * @return {boolean} True if binding is still bound to the signal and has a listener.
    */
    isBound: function () {
        return (!!this._signal && !!this._listener);
    },

    /**
    * @method Phaser.SignalBinding#isOnce
    * @return {boolean} If SignalBinding will only be executed once.
    */
    isOnce: function () {
        return this._isOnce;
    },

    /**
    * @method Phaser.SignalBinding#getListener
    * @return {Function} Handler function bound to the signal.
    */
    getListener: function () {
        return this._listener;
    },

    /**
    * @method Phaser.SignalBinding#getSignal
    * @return {Signal} Signal that listener is currently bound to.
    */
    getSignal: function () {
        return this._signal;
    },

    /**
    * @method Phaser.SignalBinding#_destroy
    * Delete instance properties
    * @private
    */
    _destroy: function () {
        delete this._signal;
        delete this._listener;
        delete this.context;
    },

    /**
    * @method Phaser.SignalBinding#toString
    * @return {string} String representation of the object.
    */
    toString: function () {
        return '[Phaser.SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Stage controls the canvas on which everything is displayed. It handles display within the browser,
* focus handling, game resizing, scaling and the pause, boot and orientation screens.
*
* @class Phaser.Stage
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
* @param {number} width - Width of the canvas element.
* @param {number} height - Height of the canvas element.
 */
Phaser.Stage = function (game, width, height) {

    /**
	* @property {Phaser.Game} game - A reference to the currently running Game.
	*/
	this.game = game;

    /**
	* @property {string} game - Background color of the stage (defaults to black). Set via the public backgroundColor property.
	* @private
	* @default 'rgb(0,0,0)'
	*/
    this._backgroundColor = 'rgb(0,0,0)';

    /**
	* @property {Phaser.Point} offset - Get the offset values (for input and other things).
	*/
	this.offset = new Phaser.Point;
    
    /**
    * @property {HTMLCanvasElement} canvas - Reference to the newly created &lt;canvas&gt; element.
    */
    this.canvas = Phaser.Canvas.create(width, height); 
    this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
    
    /**
    * @property {PIXI.Stage} _stage - The Pixi Stage which is hooked to the renderer.
    * @private
    */
    this._stage = new PIXI.Stage(0x000000, false);
    this._stage.name = '_stage_root';

    /**
    * @property {number} scaleMode - The current scaleMode.
    */    
    this.scaleMode = Phaser.StageScaleMode.NO_SCALE;

    /**
    * @property {Phaser.StageScaleMode} scale - The scale of the current running game.
    */
    this.scale = new Phaser.StageScaleMode(this.game, width, height);

    /**
     * @property {number} aspectRatio - Aspect ratio.
     */
    this.aspectRatio = width / height;

    /**
    * @property {number} _nextOffsetCheck - The time to run the next offset check.
    * @private
    */
    this._nextOffsetCheck = 0;

    /**
    * @property {number|false} checkOffsetInterval - The time (in ms) between which the stage should check to see if it has moved.
    * @default
    */
    this.checkOffsetInterval = 2500;

};

Phaser.Stage.prototype = {

    /**
    * Initialises the stage and adds the event listeners.
    * @method Phaser.Stage#boot
    * @private
    */
    boot: function () {

        Phaser.Canvas.getOffset(this.canvas, this.offset);

        this.bounds = new Phaser.Rectangle(this.offset.x, this.offset.y, this.game.width, this.game.height);

        var _this = this;

        this._onChange = function (event) {
            return _this.visibilityChange(event);
        }

        Phaser.Canvas.setUserSelect(this.canvas, 'none');
        Phaser.Canvas.setTouchAction(this.canvas, 'none');

        document.addEventListener('visibilitychange', this._onChange, false);
        document.addEventListener('webkitvisibilitychange', this._onChange, false);
        document.addEventListener('pagehide', this._onChange, false);
        document.addEventListener('pageshow', this._onChange, false);

        window.onblur = this._onChange;
        window.onfocus = this._onChange;

    },

    /**
    * Runs Stage processes that need periodic updates, such as the offset checks.
    * @method Phaser.Stage#update
    */
    update: function () {

        if (this.checkOffsetInterval !== false)
        {
            if (this.game.time.now > this._nextOffsetCheck)
            {
                Phaser.Canvas.getOffset(this.canvas, this.offset);
                this._nextOffsetCheck = this.game.time.now + this.checkOffsetInterval;
            }

        }

    },

	/**
    * This method is called when the document visibility is changed.
    * @method Phaser.Stage#visibilityChange
    * @param {Event} event - Its type will be used to decide whether the game should be paused or not.
    */
    visibilityChange: function (event) {

        if (this.disableVisibilityChange)
        {
            return;
        }

        if (event.type == 'pagehide' || event.type == 'blur' || document['hidden'] == true || document['webkitHidden'] == true)
        {
	        this.game.paused = true;
        }
        else
        {
	        this.game.paused = false;
        }

    },

};

/**
* @name Phaser.Stage#backgroundColor
* @property {number|string} paused - Gets and sets the background color of the stage. The color can be given as a number: 0xff0000 or a hex string: '#ff0000'
*/
Object.defineProperty(Phaser.Stage.prototype, "backgroundColor", {

    get: function () {
        return this._backgroundColor;
    },

    set: function (color) {

        this._backgroundColor = color;

        if (typeof color === 'string')
        {
            color = Phaser.Color.hexToRGB(color);
        }

        this._stage.setBackgroundColor(color);

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser Group constructor.
* @class Phaser.Group
* @classdesc A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {*} parent - The parent Group or DisplayObjectContainer that will hold this group, if any.
* @param {string} [name=group] - A name for this Group. Not used internally but useful for debugging.
* @param {boolean} [useStage=false] - Should the DisplayObjectContainer this Group creates be added to the World (default, false) or direct to the Stage (true).
*/
Phaser.Group = function (game, parent, name, useStage) {

	if (typeof parent === 'undefined')
	{
		parent = game.world;
	}

	if (typeof useStage === 'undefined')
	{
		useStage = false;
	}

    /**
	* @property {Phaser.Game} game - A reference to the currently running Game.
	*/
	this.game = game;
	
    /**
	* @property {string} name - A name for this Group. Not used internally but useful for debugging.
	*/
	this.name = name || 'group';

	if (useStage)
	{
		this._container = this.game.stage._stage;
	}
	else
	{
		this._container = new PIXI.DisplayObjectContainer();
		this._container.name = this.name;

		if (parent)
		{
			if (parent instanceof Phaser.Group)
			{
				parent._container.addChild(this._container);
				parent._container.updateTransform();
			}
			else
			{
				parent.addChild(this._container);
				parent.updateTransform();
			}
		}
		else
		{
			this.game.stage._stage.addChild(this._container);
			this.game.stage._stage.updateTransform();
		}
	}

	/**
	* @property {number} type - Internal Phaser Type value.
	* @protected
	*/
	this.type = Phaser.GROUP;

	/**
	* @property {boolean} exists - If exists is true the the Group is updated, otherwise it is skipped.
	* @default
	*/
	this.exists = true;

    /**
    * @property {Phaser.Point} scale - Replaces the PIXI.Point with a slightly more flexible one.
    */ 
    this.scale = new Phaser.Point(1, 1);

};

Phaser.Group.prototype = {

    /**
    * Adds an existing object to this Group. The object can be an instance of Phaser.Sprite, Phaser.Button or any other display object.
    * The child is automatically added to the top of the Group, so renders on-top of everything else within the Group. If you need to control
    * that then see the addAt method.
    *
    * @see Phaser.Group#create
    * @see Phaser.Group#addAt
    * @method Phaser.Group#add
	* @param {*} child - An instance of Phaser.Sprite, Phaser.Button or any other display object..
	* @return {*} The child that was added to the Group.
    */
	add: function (child) {

		if (child.group !== this)
		{
			child.group = this;

			if (child.events)
			{
				child.events.onAddedToGroup.dispatch(child, this);
			}

			this._container.addChild(child);

			child.updateTransform();
		}

		return child;

	},

    /**
    * Adds an existing object to this Group. The object can be an instance of Phaser.Sprite, Phaser.Button or any other display object.
    * The child is added to the Group at the location specified by the index value, this allows you to control child ordering.
	*
    * @method Phaser.Group#addAt
	* @param {*} child - An instance of Phaser.Sprite, Phaser.Button or any other display object..
	* @param {number} index - The index within the Group to insert the child to.
	* @return {*} The child that was added to the Group.
	*/
	addAt: function (child, index) {

		if (child.group !== this)
		{
			child.group = this;

			if (child.events)
			{
				child.events.onAddedToGroup.dispatch(child, this);
			}

			this._container.addChildAt(child, index);

			child.updateTransform();
		}

		return child;

	},

    /**
	* Returns the child found at the given index within this Group.
	*
    * @method Phaser.Group#getAt
    * @memberof Phaser.Group
	* @param {number} index - The index to return the child from.
	* @return {*} The child that was found at the given index.
	*/
	getAt: function (index) {

		return this._container.getChildAt(index);

	},

    /**
	* Automatically creates a new Phaser.Sprite object and adds it to the top of this Group.
	* Useful if you don't need to create the Sprite instances before-hand.
	*
    * @method Phaser.Group#create
	* @param {number} x - The x coordinate to display the newly created Sprite at. The value is in relation to the Group.x point.
	* @param {number} y - The y coordinate to display the newly created Sprite at. The value is in relation to the Group.y point.
	* @param {string} key - The Game.cache key of the image that this Sprite will use.
	* @param {number|string} [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
	* @param {boolean} [exists=true] - The default exists state of the Sprite.
	* @return {Phaser.Sprite} The child that was created.
	*/
	create: function (x, y, key, frame, exists) {

		if (typeof exists == 'undefined') { exists = true; }

		var child = new Phaser.Sprite(this.game, x, y, key, frame);

		child.group = this;
		child.exists = exists;
		child.visible = exists;
		child.alive = exists;

		if (child.events)
		{
			child.events.onAddedToGroup.dispatch(child, this);
		}

		this._container.addChild(child);
			
		child.updateTransform();

		return child;

	},

    /**
	* Automatically creates multiple Phaser.Sprite objects and adds them to the top of this Group.
	* Useful if you need to quickly generate a pool of identical sprites, such as bullets. By default the sprites will be set to not exist
	* and will be positioned at 0, 0 (relative to the Group.x/y)
	*
    * @method Phaser.Group#createMultiple
	* @param {number} quantity - The number of Sprites to create.
	* @param {string} key - The Game.cache key of the image that this Sprite will use.
	* @param {number|string} [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
	* @param {boolean} [exists=false] - The default exists state of the Sprite.
	*/
	createMultiple: function (quantity, key, frame, exists) {

		if (typeof exists == 'undefined') { exists = false; }

		for (var i = 0; i < quantity; i++)
		{
			var child = new Phaser.Sprite(this.game, 0, 0, key, frame);

			child.group = this;
			child.exists = exists;
			child.visible = exists;
			child.alive = exists;

			if (child.events)
			{
				child.events.onAddedToGroup.dispatch(child, this);
			}

			this._container.addChild(child);
			child.updateTransform();

		}

	},

	/**
	* Swaps the position of two children in this Group.
	*
    * @method Phaser.Group#swap
	* @param {*} child1 - The first child to swap.
	* @param {*} child2 - The second child to swap.
    * @return {boolean} True if the swap was successful, otherwise false.
	*/
	swap: function (child1, child2) {

		if (child1 === child2 || !child1.parent || !child2.parent)
		{
			console.warn('You cannot swap a child with itself or swap un-parented children');
			return false;
		}

		//	Cache the values
		var child1Prev = child1._iPrev;
		var child1Next = child1._iNext;
		var child2Prev = child2._iPrev;
		var child2Next = child2._iNext;

		var endNode = this._container.last._iNext;
		var currentNode = this.game.stage._stage;
			
		do
		{
			if (currentNode !== child1 && currentNode !== child2)
			{
				if (currentNode.first === child1)
				{
					currentNode.first = child2;
				}
				else if (currentNode.first === child2)
				{
					currentNode.first = child1;
				}

				if (currentNode.last === child1)
				{
					currentNode.last = child2;
				}
				else if (currentNode.last === child2)
				{
					currentNode.last = child1;
				}
			}

			currentNode = currentNode._iNext;
		}
		while (currentNode != endNode)

		if (child1._iNext == child2)
		{
			//	This is a downward (A to B) neighbour swap
			child1._iNext = child2Next;
			child1._iPrev = child2;
			child2._iNext = child1;
			child2._iPrev = child1Prev;

			if (child1Prev) { child1Prev._iNext = child2; }
			if (child2Next) { child2Next._iPrev = child1; }

			if (child1.__renderGroup)
			{
				child1.__renderGroup.updateTexture(child1);
			}

			if (child2.__renderGroup)
			{
				child2.__renderGroup.updateTexture(child2);
			}

			return true;
		}
		else if (child2._iNext == child1)
		{
			//	This is an upward (B to A) neighbour swap
			child1._iNext = child2;
			child1._iPrev = child2Prev;
			child2._iNext = child1Next;
			child2._iPrev = child1;

			if (child2Prev) { child2Prev._iNext = child1; }
			if (child1Next) { child2Next._iPrev = child2; }

			if (child1.__renderGroup)
			{
				child1.__renderGroup.updateTexture(child1);
			}

			if (child2.__renderGroup)
			{
				child2.__renderGroup.updateTexture(child2);
			}

			return true;
		}
		else
		{
			//	Children are far apart
			child1._iNext = child2Next;
			child1._iPrev = child2Prev;
			child2._iNext = child1Next;
			child2._iPrev = child1Prev;

			if (child1Prev) { child1Prev._iNext = child2; }
			if (child1Next) { child1Next._iPrev = child2; }
			if (child2Prev) { child2Prev._iNext = child1; }
			if (child2Next) { child2Next._iPrev = child1; }

			if (child1.__renderGroup)
			{
				child1.__renderGroup.updateTexture(child1);
			}

			if (child2.__renderGroup)
			{
				child2.__renderGroup.updateTexture(child2);
			}

			return true;
		}

		return false;
		
	},

	/**
	* Brings the given child to the top of this Group so it renders above all other children.
	*
    * @method Phaser.Group#bringToTop
	* @param {*} child - The child to bring to the top of this Group.
    * @return {*} The child that was moved.
	*/
	bringToTop: function (child) {

		if (child.group === this)
		{
			this.remove(child);
			this.add(child);
		}

		return child;

	},

	/**
	* Get the index position of the given child in this Group.
	*
    * @method Phaser.Group#getIndex
	* @param {*} child - The child to get the index for.
    * @return {number} The index of the child or -1 if it's not a member of this Group.
	*/
	getIndex: function (child) {

		return this._container.children.indexOf(child);

	},

	/**
	* Replaces a child of this Group with the given newChild. The newChild cannot be a member of this Group.
	*
    * @method Phaser.Group#replace
	* @param {*} oldChild - The child in this Group that will be replaced.
	* @param {*} newChild - The child to be inserted into this group.
	*/
	replace: function (oldChild, newChild) {

		if (!this._container.first._iNext)
		{
			return;
		}

		var index = this.getIndex(oldChild);
		
		if (index != -1)
		{
			if (newChild.parent != undefined)
			{
				newChild.events.onRemovedFromGroup.dispatch(newChild, this);
				newChild.parent.removeChild(newChild);
			}

			this._container.removeChild(oldChild);
			this._container.addChildAt(newChild, index);
			newChild.events.onAddedToGroup.dispatch(newChild, this);
			newChild.updateTransform();
		}

	},

	/**
     * Sets the given property to the given value on the child. The operation controls the assignment of the value.
     *
     * @method Phaser.Group#setProperty
     * @param {*} child - The child to set the property value on.
     * @param {array} key - An array of strings that make up the property that will be set.
     * @param {*} value - The value that will be set.
     * @param {number} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
     */
	setProperty: function (child, key, value, operation) {

		operation = operation || 0;

		//	As ugly as this approach looks, and although it's limited to a depth of only 4, it's extremely fast.
		//	Much faster than a for loop or object iteration. There are no checks, so if the key isn't valid then it'll fail
		//	but as you are likely to call this from inner loops that have to perform well, I'll take that trade off.

		//	0 = Equals
		//	1 = Add
		//	2 = Subtract
		//	3 = Multiply
		//	4 = Divide

		if (key.length == 1)
		{
			if (operation == 0) { child[key[0]] = value; }
			else if (operation == 1) { child[key[0]] += value; }
			else if (operation == 2) { child[key[0]] -= value; }
			else if (operation == 3) { child[key[0]] *= value; }
			else if (operation == 4) { child[key[0]] /= value; }
		}
		else if (key.length == 2)
		{
			if (operation == 0) { child[key[0]][key[1]] = value; }
			else if (operation == 1) { child[key[0]][key[1]] += value; }
			else if (operation == 2) { child[key[0]][key[1]] -= value; }
			else if (operation == 3) { child[key[0]][key[1]] *= value; }
			else if (operation == 4) { child[key[0]][key[1]] /= value; }
		}
		else if (key.length == 3)
		{
			if (operation == 0) { child[key[0]][key[1]][key[2]] = value; }
			else if (operation == 1) { child[key[0]][key[1]][key[2]] += value; }
			else if (operation == 2) { child[key[0]][key[1]][key[2]] -= value; }
			else if (operation == 3) { child[key[0]][key[1]][key[2]] *= value; }
			else if (operation == 4) { child[key[0]][key[1]][key[2]] /= value; }
		}
		else if (key.length == 4)
		{
			if (operation == 0) { child[key[0]][key[1]][key[2]][key[3]] = value; }
			else if (operation == 1) { child[key[0]][key[1]][key[2]][key[3]] += value; }
			else if (operation == 2) { child[key[0]][key[1]][key[2]][key[3]] -= value; }
			else if (operation == 3) { child[key[0]][key[1]][key[2]][key[3]] *= value; }
			else if (operation == 4) { child[key[0]][key[1]][key[2]][key[3]] /= value; }
		}
		else
		{
			//	TODO - Deep property scane
		}

	},

	/**
     * This function allows you to quickly set the same property across all children of this Group to a new value.
     * The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
     *
     * @method Phaser.Group#setAll
     * @param {string} key - The property, as a string, to be set. For example: 'body.velocity.x'
     * @param {*} value - The value that will be set.
     * @param {boolean} [checkAlive=false] - If set then only children with alive=true will be updated.
     * @param {boolean} [checkVisible=false] - If set then only children with visible=true will be updated.
     * @param {number} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
     */
	setAll: function (key, value, checkAlive, checkVisible, operation) {

		key = key.split('.');

		if (typeof checkAlive === 'undefined') { checkAlive = false; }
		if (typeof checkVisible === 'undefined') { checkVisible = false; }

		operation = operation || 0;

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if ((checkAlive == false || (checkAlive && currentNode.alive)) && (checkVisible == false || (checkVisible && currentNode.visible)))
				{
					this.setProperty(currentNode, key, value, operation);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext)
		}

	},

	/**
     * Adds the amount to the given property on all children in this Group.
     * Group.addAll('x', 10) will add 10 to the child.x value.
     *
     * @method Phaser.Group#addAll
     * @param {string} property - The property to increment, for example 'body.velocity.x' or 'angle'.
     * @param {number} amount - The amount to increment the property by. If child.x = 10 then addAll('x', 40) would make child.x = 50.
     * @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
     * @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
     */
	addAll: function (property, amount, checkAlive, checkVisible) {

		this.setAll(property, amount, checkAlive, checkVisible, 1);

	},

	/**
     * Subtracts the amount from the given property on all children in this Group.
     * Group.subAll('x', 10) will minus 10 from the child.x value.
     *
     * @method Phaser.Group#subAll
     * @param {string} property - The property to decrement, for example 'body.velocity.x' or 'angle'.
     * @param {number} amount - The amount to subtract from the property. If child.x = 50 then subAll('x', 40) would make child.x = 10.
     * @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
     * @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
     */
	subAll: function (property, amount, checkAlive, checkVisible) {

		this.setAll(property, amount, checkAlive, checkVisible, 2);

	},

	/**
     * Multiplies the given property by the amount on all children in this Group.
     * Group.multiplyAll('x', 2) will x2 the child.x value.
     *
     * @method Phaser.Group#multiplyAll
     * @param {string} property - The property to multiply, for example 'body.velocity.x' or 'angle'.
     * @param {number} amount - The amount to multiply the property by. If child.x = 10 then multiplyAll('x', 2) would make child.x = 20.
     * @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
     * @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
     */
	multiplyAll: function (property, amount, checkAlive, checkVisible) {

		this.setAll(property, amount, checkAlive, checkVisible, 3);

	},

	/**
     * Divides the given property by the amount on all children in this Group.
     * Group.divideAll('x', 2) will half the child.x value.
     *
     * @method Phaser.Group#divideAll
     * @param {string} property - The property to divide, for example 'body.velocity.x' or 'angle'.
     * @param {number} amount - The amount to divide the property by. If child.x = 100 then divideAll('x', 2) would make child.x = 50.
     * @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
     * @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
     */
	divideAll: function (property, amount, checkAlive, checkVisible) {

		this.setAll(property, amount, checkAlive, checkVisible, 4);

	},

	/**
    * Calls a function on all of the children that have exists=true in this Group.
    * After the existsValue parameter you can add as many parameters as you like, which will all be passed to the child callback.
    * 
    * @method Phaser.Group#callAllExists
    * @param {function} callback - The function that exists on the children that will be called.
    * @param {boolean} existsValue - Only children with exists=existsValue will be called.
    * @param {...*} parameter - Additional parameters that will be passed to the callback.
    */
	callAllExists: function (callback, existsValue) {

		var args = Array.prototype.splice.call(arguments, 2);

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.exists == existsValue && currentNode[callback])
				{
					currentNode[callback].apply(currentNode, args);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext)

		}

	},

	/**
    * Calls a function on all of the children regardless if they are dead or alive (see callAllExists if you need control over that)
    * After the callback parameter you can add as many extra parameters as you like, which will all be passed to the child.
    * 
    * @method Phaser.Group#callAll
    * @param {function} callback - The function that exists on the children that will be called.
    * @param {...*} parameter - Additional parameters that will be passed to the callback.
    */
	callAll: function (callback) {

		var args = Array.prototype.splice.call(arguments, 1);

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode[callback])
				{
					currentNode[callback].apply(currentNode, args);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext)

		}

	},

	/**
	* Allows you to call your own function on each member of this Group. You must pass the callback and context in which it will run.
   	* After the checkExists parameter you can add as many parameters as you like, which will all be passed to the callback along with the child.
   	* For example: Group.forEach(awardBonusGold, this, true, 100, 500)
	* 
	* @method Phaser.Group#forEach
	* @param {function} callback - The function that will be called. Each child of the Group will be passed to it as its first parameter.
    * @param {Object} callbackContext - The context in which the function should be called (usually 'this').
    * @param {boolean} checkExists - If set only children with exists=true will be passed to the callback, otherwise all children will be passed.
	*/
	forEach: function (callback, callbackContext, checkExists) {

		if (typeof checkExists === 'undefined')
		{
			checkExists = false;
		}

		var args = Array.prototype.splice.call(arguments, 3);
		args.unshift(null);

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (checkExists == false || (checkExists && currentNode.exists))
				{
					args[0] = currentNode;
					callback.apply(callbackContext, args);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);

		}

	},

	/**
	* Allows you to call your own function on each alive member of this Group (where child.alive=true). You must pass the callback and context in which it will run.
   	* You can add as many parameters as you like, which will all be passed to the callback along with the child.
   	* For example: Group.forEachAlive(causeDamage, this, 500)
	* 
	* @method Phaser.Group#forEachAlive
	* @param {function} callback - The function that will be called. Each child of the Group will be passed to it as its first parameter.
    * @param {Object} callbackContext - The context in which the function should be called (usually 'this').
	*/
	forEachAlive: function (callback, callbackContext) {

		var args = Array.prototype.splice.call(arguments, 2);
		args.unshift(null);

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.alive)
				{
					args[0] = currentNode;
					callback.apply(callbackContext, args);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);

		}

	},

	/**
	* Allows you to call your own function on each dead member of this Group (where alive=false). You must pass the callback and context in which it will run.
   	* You can add as many parameters as you like, which will all be passed to the callback along with the child.
   	* For example: Group.forEachDead(bringToLife, this)
	* 
	* @method Phaser.Group#forEachDead
	* @param {function} callback - The function that will be called. Each child of the Group will be passed to it as its first parameter.
    * @param {Object} callbackContext - The context in which the function should be called (usually 'this').
	*/
	forEachDead: function (callback, callbackContext) {

		var args = Array.prototype.splice.call(arguments, 2);
		args.unshift(null);

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.alive == false)
				{
					args[0] = currentNode;
					callback.apply(callbackContext, args);
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);

		}
	},

	/**
    * Call this function to retrieve the first object with exists == (the given state) in the Group.
    *
    * @method Phaser.Group#getFirstExists
    * @param {boolean} state - True or false.
    * @return {Any} The first child, or null if none found.
    */
	getFirstExists: function (state) {

		if (typeof state !== 'boolean')
		{
			state = true;
		}

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.exists === state)
				{
					return currentNode;
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);
		}

		return null;

	},

	/**
    * Call this function to retrieve the first object with alive == true in the group.
    * This is handy for checking if everything has been wiped out, or choosing a squad leader, etc.
    *
    * @method Phaser.Group#getFirstAlive
    * @return {Any} The first alive child, or null if none found.
    */
	getFirstAlive: function () {

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.alive)
				{
					return currentNode;
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);
		}

		return null;

	},

	/**
    * Call this function to retrieve the first object with alive == false in the group.
    * This is handy for checking if everything has been wiped out, or choosing a squad leader, etc.
    *
    * @method Phaser.Group#getFirstDead
    * @return {Any} The first dead child, or null if none found.
    */
	getFirstDead: function () {

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (!currentNode.alive)
				{
					return currentNode;
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);
		}

		return null;

	},

	/**
    * Call this function to find out how many members of the group are alive.
    *
    * @method Phaser.Group#countLiving
    * @return {number} The number of children flagged as alive. Returns -1 if Group is empty.
    */
	countLiving: function () {

		var total = 0;

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (currentNode.alive)
				{
					total++;
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);
		}
		else
		{
			total = -1;
		}

		return total;

	},

	/**
    * Call this function to find out how many members of the group are dead.
    *
    * @method Phaser.Group#countDead
    * @return {number} The number of children flagged as dead. Returns -1 if Group is empty.
    */
	countDead: function () {

		var total = 0;

		if (this._container.children.length > 0 && this._container.first._iNext)
		{
			var currentNode = this._container.first._iNext;
				
			do	
			{
				if (!currentNode.alive)
				{
					total++;
				}

				currentNode = currentNode._iNext;
			}
			while (currentNode != this._container.last._iNext);
		}
		else
		{
			total = -1;
		}

		return total;

	},

	/**
    * Returns a member at random from the group.
    *
    * @method Phaser.Group#getRandom
    * @param {number} startIndex - Optional offset off the front of the array. Default value is 0, or the beginning of the array.
    * @param {number} length - Optional restriction on the number of values you want to randomly select from.
    * @return {Any} A random child of this Group.
    */
	getRandom: function (startIndex, length) {

		if (this._container.children.length == 0)
		{
			return null;
		}

		startIndex = startIndex || 0;
		length = length || this._container.children.length;

        return this.game.math.getRandom(this._container.children, startIndex, length);

	},

	/**
	* Removes the given child from this Group and sets its group property to null.
	*
	* @method Phaser.Group#remove
	* @param {Any} child - The child to remove.
	*/
	remove: function (child) {

		if (child.events)
		{
			child.events.onRemovedFromGroup.dispatch(child, this);
		}

		this._container.removeChild(child);

		child.group = null;

	},

	/**
	* Removes all children from this Group, setting all group properties to null.
	* The Group container remains on the display list.
	*
	* @method Phaser.Group#removeAll
	*/
	removeAll: function () {

		if (this._container.children.length == 0)
		{
			return;
		}

		do
		{
			if (this._container.children[0].events)
			{
				this._container.children[0].events.onRemovedFromGroup.dispatch(this._container.children[0], this);
			}
			this._container.removeChild(this._container.children[0]);
		}
		while (this._container.children.length > 0);

	},

	/**
	* Removes all children from this Group whos index falls beteen the given startIndex and endIndex values.
	*
	* @method Phaser.Group#removeBetween
	* @param {number} startIndex - The index to start removing children from.
	* @param {number} endIndex - The index to stop removing children from. Must be higher than startIndex and less than the length of the Group.
	*/	
	removeBetween: function (startIndex, endIndex) {

		if (this._container.children.length == 0)
		{
			return;
		}

		if (startIndex > endIndex || startIndex < 0 || endIndex > this._container.children.length)
		{
			return false;
		}

		for (var i = startIndex; i < endIndex; i++)
		{
			var child = this._container.children[i];
			child.events.onRemovedFromGroup.dispatch(child, this);
			this._container.removeChild(child);
		}

	},

	/**
	* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
	*
	* @method Phaser.Group#destroy
	*/
	destroy: function () {

		this.removeAll();

		this._container.parent.removeChild(this._container);

		this._container = null;

		this.game = null;

		this.exists = false;

	},

	/**
	* Dumps out a list of Group children and their index positions to the browser console. Useful for group debugging.
	*
	* @method Phaser.Group#dump
	* @param {boolean} [full=false] - If full the dump will include the entire display list, start from the Stage. Otherwise it will only include this container.
	*/
	dump: function (full) {

		if (typeof full == 'undefined')
		{
			full = false;
		}

		var spacing = 20;
		var output = "\n" + Phaser.Utils.pad('Node', spacing) + "|" + Phaser.Utils.pad('Next', spacing) + "|" + Phaser.Utils.pad('Previous', spacing) + "|" + Phaser.Utils.pad('First', spacing) + "|" + Phaser.Utils.pad('Last', spacing);

		console.log(output);

		var output = Phaser.Utils.pad('----------', spacing) + "|" + Phaser.Utils.pad('----------', spacing) + "|" + Phaser.Utils.pad('----------', spacing) + "|" + Phaser.Utils.pad('----------', spacing) + "|" + Phaser.Utils.pad('----------', spacing);
		console.log(output);

		if (full)
		{
			var testObject = this.game.stage._stage.last._iNext;
			var displayObject = this.game.stage._stage;
		}
		else
		{
			var testObject = this._container.last._iNext;
			var displayObject = this._container;
		}
		
		do	
		{
			var name = displayObject.name || '*';
			var nameNext = '-';
			var namePrev = '-';
			var nameFirst = '-';
			var nameLast = '-';

			if (displayObject._iNext)
			{
				nameNext = displayObject._iNext.name;
			}

			if (displayObject._iPrev)
			{
				namePrev = displayObject._iPrev.name;
			}

			if (displayObject.first)
			{
				nameFirst = displayObject.first.name;
			}

			if (displayObject.last)
			{
				nameLast = displayObject.last.name;
			}

			if (typeof nameNext === 'undefined')
			{
				nameNext = '-';
			}

			if (typeof namePrev === 'undefined')
			{
				namePrev = '-';
			}

			if (typeof nameFirst === 'undefined')
			{
				nameFirst = '-';
			}

			if (typeof nameLast === 'undefined')
			{
				nameLast = '-';
			}

			var output = Phaser.Utils.pad(name, spacing) + "|" + Phaser.Utils.pad(nameNext, spacing) + "|" + Phaser.Utils.pad(namePrev, spacing) + "|" + Phaser.Utils.pad(nameFirst, spacing) + "|" + Phaser.Utils.pad(nameLast, spacing);
			console.log(output);

			displayObject = displayObject._iNext;

		}
		while(displayObject != testObject)

	}

};

/**
* @name Phaser.Group#total
* @property {number} total - The total number of children in this Group, regardless of their alive state.
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "total", {

    get: function () {
        return this._container.children.length;
    }

});

/**
* @name Phaser.Group#length
* @property {number} length - The number of children in this Group.
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "length", {

    get: function () {
        return this._container.children.length;
    }

});

/**
* The x coordinate of the Group container. You can adjust the Group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#x
* @property {number} x - The x coordinate of the Group container.
*/
Object.defineProperty(Phaser.Group.prototype, "x", {

    get: function () {
        return this._container.position.x;
    },

    set: function (value) {
        this._container.position.x = value;
    }

});

/**
* The y coordinate of the Group container. You can adjust the Group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#y
* @property {number} y - The y coordinate of the Group container.
*/
Object.defineProperty(Phaser.Group.prototype, "y", {

    get: function () {
        return this._container.position.y;
    },

    set: function (value) {
        this._container.position.y = value;
    }

});

/**
* The angle of rotation of the Group container. This will adjust the Group container itself by modifying its rotation.
* This will have no impact on the rotation value of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#angle
* @property {number} angle - The angle of rotation given in degrees, where 0 degrees = to the right.
*/
Object.defineProperty(Phaser.Group.prototype, "angle", {

    get: function() {
        return Phaser.Math.radToDeg(this._container.rotation);
    },

    set: function(value) {
        this._container.rotation = Phaser.Math.degToRad(value);
    }

});

/**
* The angle of rotation of the Group container. This will adjust the Group container itself by modifying its rotation.
* This will have no impact on the rotation value of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#rotation
* @property {number} rotation - The angle of rotation given in radians.
*/
Object.defineProperty(Phaser.Group.prototype, "rotation", {

    get: function () {
        return this._container.rotation;
    },

    set: function (value) {
        this._container.rotation = value;
    }

});

/**
* @name Phaser.Group#visible
* @property {boolean} visible - The visible state of the Group. Non-visible Groups and all of their children are not rendered.
*/
Object.defineProperty(Phaser.Group.prototype, "visible", {

    get: function () {
        return this._container.visible;
    },

    set: function (value) {
        this._container.visible = value;
    }

});

/**
* @name Phaser.Group#alpha
* @property {number} alpha - The alpha value of the Group container.
*/
Object.defineProperty(Phaser.Group.prototype, "alpha", {

    get: function () {
        return this._container.alpha;
    },

    set: function (value) {
        this._container.alpha = value;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* "This world is but a canvas to our imagination." - Henry David Thoreau
*
* A game has only one world. The world is an abstract place in which all game objects live. It is not bound
* by stage limits and can be any size. You look into the world via cameras. All game objects live within
* the world at world-based coordinates. By default a world is created the same size as your Stage.
*
* @class Phaser.World
* @constructor
* @param {Phaser.Game} game - Reference to the current game instance.
*/
Phaser.World = function (game) {

    Phaser.Group.call(this, game, null, '__world', false);

    /**
    * @property {Phaser.Point} scale - Replaces the PIXI.Point with a slightly more flexible one.
    */ 
    this.scale = new Phaser.Point(1, 1);

    /**
    * The World has no fixed size, but it does have a bounds outside of which objects are no longer considered as being "in world" and you should use this to clean-up the display list and purge dead objects.
    * By default we set the Bounds to be from 0,0 to Game.width,Game.height. I.e. it will match the size given to the game constructor with 0,0 representing the top-left of the display.
    * However 0,0 is actually the center of the world, and if you rotate or scale the world all of that will happen from 0,0.
    * So if you want to make a game in which the world itself will rotate you should adjust the bounds so that 0,0 is the center point, i.e. set them to -1000,-1000,2000,2000 for a 2000x2000 sized world centered around 0,0.
	* @property {Phaser.Rectangle} bounds - Bound of this world that objects can not escape from.
	*/
	this.bounds = new Phaser.Rectangle(0, 0, game.width, game.height);

    /**
	* @property {Phaser.Camera} camera - Camera instance.
	*/
	this.camera = null;

    /**
	* @property {number} currentRenderOrderID - Reset each frame, keeps a count of the total number of objects updated.
	*/
	this.currentRenderOrderID = 0;
	
};

Phaser.World.prototype = Object.create(Phaser.Group.prototype);
Phaser.World.prototype.constructor = Phaser.World;

/**
* Initialises the game world.
*
* @method Phaser.World#boot
* @protected
*/
Phaser.World.prototype.boot = function () {

    this.camera = new Phaser.Camera(this.game, 0, 0, 0, this.game.width, this.game.height);

    this.camera.displayObject = this._container;

    this.game.camera = this.camera;

}

/**
* This is called automatically every frame, and is where main logic happens.
* 
* @method Phaser.World#update
*/
Phaser.World.prototype.update = function () {

	this.currentRenderOrderID = 0;

	if (this.game.stage._stage.first._iNext)
	{
		var currentNode = this.game.stage._stage.first._iNext;
		
		do
		{
			if (currentNode['preUpdate'])
			{
				currentNode.preUpdate();
			}

			if (currentNode['update'])
			{
				currentNode.update();
			}
			
			currentNode = currentNode._iNext;
		}
		while (currentNode != this.game.stage._stage.last._iNext)
	}

}

/**
* This is called automatically every frame, and is where main logic happens.
* @method Phaser.World#postUpdate
*/
Phaser.World.prototype.postUpdate = function () {

    this.camera.update();

    if (this.game.stage._stage.first._iNext)
    {
        var currentNode = this.game.stage._stage.first._iNext;
        
        do  
        {
            if (currentNode['postUpdate'])
            {
                currentNode.postUpdate();
            }
            
            currentNode = currentNode._iNext;
        }
        while (currentNode != this.game.stage._stage.last._iNext)
    }

}

/**
* Updates the size of this world. Note that this doesn't modify the world x/y coordinates, just the width and height.
* If you need to adjust the bounds of the world
* @method Phaser.World#setBounds
* @param {number} x - Top left most corner of the world.
* @param {number} y - Top left most corner of the world.
* @param {number} width - New width of the world.
* @param {number} height - New height of the world.
*/
Phaser.World.prototype.setBounds = function (x, y, width, height) {

    this.bounds.setTo(x, y, width, height);

    if (this.camera.bounds)
    {
        this.camera.bounds.setTo(x, y, width, height);
    }

}

/**
* Destroyer of worlds.
* @method Phaser.World#destroy
*/
Phaser.World.prototype.destroy = function () {

    this.camera.x = 0;
    this.camera.y = 0;

    this.game.input.reset(true);

    this.removeAll();

}

/**
* @name Phaser.World#width
* @property {number} width - Gets or sets the current width of the game world.
*/
Object.defineProperty(Phaser.World.prototype, "width", {

    get: function () {
        return this.bounds.width;
    },

    set: function (value) {
        this.bounds.width = value;
    }

});

/**
* @name Phaser.World#height
* @property {number} height - Gets or sets the current height of the game world.
*/
Object.defineProperty(Phaser.World.prototype, "height", {

    get: function () {
        return this.bounds.height;
    },

    set: function (value) {
        this.bounds.height = value;
    }

});

/**
* @name Phaser.World#centerX
* @property {number} centerX - Gets the X position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerX", {

    get: function () {
        return this.bounds.halfWidth;
    }

});

/**
* @name Phaser.World#centerY
* @property {number} centerY - Gets the Y position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerY", {

    get: function () {
        return this.bounds.halfHeight;
    }

});

/**
* @name Phaser.World#randomX
* @property {number} randomX - Gets a random integer which is lesser than or equal to the current width of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomX", {

    get: function () {

        if (this.bounds.x < 0)
        {
            return this.game.rnd.integerInRange(this.bounds.x, (this.bounds.width - Math.abs(this.bounds.x)));
        }
        else
        {
            return this.game.rnd.integerInRange(this.bounds.x, this.bounds.width);
        }

    }

});

/**
* @name Phaser.World#randomY
* @property {number} randomY - Gets a random integer which is lesser than or equal to the current height of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomY", {

    get: function () {

        if (this.bounds.y < 0)
        {
            return this.game.rnd.integerInRange(this.bounds.y, (this.bounds.height - Math.abs(this.bounds.y)));
        }
        else
        {
            return this.game.rnd.integerInRange(this.bounds.y, this.bounds.height);
        }

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Game constructor
*
* Instantiate a new <code>Phaser.Game</code> object.
* @class Phaser.Game
* @classdesc This is where the magic happens. The Game object is the heart of your game,
* providing quick access to common functions and handling the boot process.
* <p>"Hell, there are no rules here - we're trying to accomplish something."</p><br>
*                                                       Thomas A. Edison
* @constructor
* @param {number} width - The width of your game in game pixels.
* @param {number} height - The height of your game in game pixels.
* @param {number} renderer -Which renderer to use (canvas or webgl)
* @param {HTMLElement} parent -The Games DOM parent.
* @param {Description} state - Description.
* @param {boolean} transparent - Use a transparent canvas background or not.
* @param  {boolean} antialias - Anti-alias graphics.
*/
Phaser.Game = function (width, height, renderer, parent, state, transparent, antialias) {

	width = width || 800;
	height = height || 600;
	renderer = renderer || Phaser.AUTO;
	parent = parent || '';
	state = state || null;

	if (typeof transparent == 'undefined') { transparent = false; }
	if (typeof antialias == 'undefined') { antialias = true; }

	/**
	* @property {number} id - Phaser Game ID (for when Pixi supports multiple instances).
	*/
	this.id = Phaser.GAMES.push(this) - 1;

	/**
	* @property {HTMLElement} parent - The Games DOM parent.
	*/
	this.parent = parent;

	//	Do some more intelligent size parsing here, so they can set "100%" for example, maybe pass the scale mode in here too?

	/**
	* @property {number} width - The Game width (in pixels).
	*/
	this.width = width;

	/**
	* @property {number} height - The Game height (in pixels).
	*/
	this.height = height;

	/**
	* @property {boolean} transparent - Use a transparent canvas background or not.
	*/
	this.transparent = transparent;

	/**
	* @property {boolean} antialias - Anti-alias graphics (in WebGL this helps with edges, in Canvas2D it retains pixel-art quality).
	*/
	this.antialias = antialias;

	/**
	* @property {number} renderer - The Pixi Renderer
	* @default
	*/
	this.renderer = null;

	/**
	* @property {number} state - The StateManager.
	*/
	this.state = new Phaser.StateManager(this, state);

	/**
	* @property {boolean} _paused - Is game paused?
	* @private
	* @default
	*/
	this._paused = false;

	/**
	* @property {number} renderType - The Renderer this Phaser.Game will use. Either Phaser.RENDERER_AUTO, Phaser.RENDERER_CANVAS or Phaser.RENDERER_WEBGL.
	*/
	this.renderType = renderer;

	/**
	* @property {boolean} _loadComplete - Whether load complete loading or not.
	* @private
	* @default
	*/
	this._loadComplete = false;

	/**
	* @property {boolean} isBooted - Whether the game engine is booted, aka available.
	* @default
	*/
	this.isBooted = false;

	/**
	* @property {boolean} id -Is game running or paused?
	* @default
	*/
	this.isRunning = false;

	/**
	* @property {Phaser.RequestAnimationFrame} raf - Automatically handles the core game loop via requestAnimationFrame or setTimeout
	* @default
	*/
	this.raf = null;

	/**
	* @property {Phaser.GameObjectFactory} add - Reference to the GameObject Factory.
	* @default
	*/
    this.add = null;

    /**
	* @property {Phaser.Cache} cache - Reference to the assets cache.
	* @default
	*/
    this.cache = null;

    /**
	* @property {Phaser.Input} input - Reference to the input manager
	* @default
	*/
    this.input = null;

    /**
	* @property {Phaser.Loader} load - Reference to the assets loader.
	* @default
	*/
    this.load = null;

    /**
	* @property {Phaser.GameMath} math - Reference to the math helper.
	* @default
	*/
    this.math = null;

    /**
	* @property {Phaser.Net} net - Reference to the network class.
	* @default
	*/
    this.net = null;

    /**
	* @property {Phaser.SoundManager} sound - Reference to the sound manager.
	* @default
	*/
    this.sound = null;

    /**
	* @property {Phaser.Stage} stage - Reference to the stage.
	* @default
	*/
    this.stage = null;

    /**
	* @property {Phaser.TimeManager} time - Reference to game clock.
	* @default
	*/
    this.time = null;

    /**
	* @property {Phaser.TweenManager} tweens - Reference to the tween manager.
	* @default
	*/
    this.tweens = null;

    /**
	* @property {Phaser.World} world - Reference to the world.
	* @default
	*/
    this.world = null;

    /**
	* @property {Phaser.Physics.PhysicsManager} physics - Reference to the physics manager.
	* @default
	*/
    this.physics = null;

    /**
	* @property {Phaser.RandomDataGenerator} rnd - Instance of repeatable random data generator helper.
	* @default
	*/
    this.rnd = null;

    /**
	* @property {Phaser.Device} device - Contains device information and capabilities.
	* @default
	*/
  this.device = null;

    /**
	* @property {Phaser.Physics.PhysicsManager} camera - A handy reference to world.camera.
	* @default
	*/
	this.camera = null;

	   /**
	* @property {HTMLCanvasElement} canvas - A handy reference to renderer.view.
	* @default
	*/
	this.canvas = null;

	/**
	* @property {Context} context - A handy reference to renderer.context (only set for CANVAS games)
	* @default
	*/
	this.context = null;

    /**
	* @property {Phaser.Utils.Debug} debug - A set of useful debug utilitie.
	* @default
	*/
	this.debug = null;

	/**
	* @property {Phaser.Particles} particles - The Particle Manager.
	* @default
	*/
	this.particles = null;

	var _this = this;

    this._onBoot = function () {
        return _this.boot();
    }

	if (document.readyState === 'complete' || document.readyState === 'interactive')
	{
		window.setTimeout(this._onBoot, 0);
	}
	else
	{
		document.addEventListener('DOMContentLoaded', this._onBoot, false);
		window.addEventListener('load', this._onBoot, false);
	}

	return this;

};

Phaser.Game.prototype = {

	/**
	* Initialize engine sub modules and start the game.
	*
	* @method Phaser.Game#boot
	* @protected
	*/
	boot: function () {

		if (this.isBooted)
		{
			return;
		}

		if (!document.body)
		{
			window.setTimeout(this._onBoot, 20);
		}
		else
		{
			document.removeEventListener('DOMContentLoaded', this._onBoot);
			window.removeEventListener('load', this._onBoot);

			this.onPause = new Phaser.Signal;
			this.onResume = new Phaser.Signal;

			this.isBooted = true;

			this.device = new Phaser.Device();
			//this.math = Phaser.Math;
			//this.rnd = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);

			this.stage = new Phaser.Stage(this, this.width, this.height);

			this.setUpRenderer();

			this.world = new Phaser.World(this);
			//this.add = new Phaser.GameObjectFactory(this);
			//this.cache = new Phaser.Cache(this);
			//this.load = new Phaser.Loader(this);
			//this.time = new Phaser.Time(this);
			//this.tweens = new Phaser.TweenManager(this);
			//this.input = new Phaser.Input(this);
			//this.sound = new Phaser.SoundManager(this);
			//this.physics = new Phaser.Physics.Arcade(this);
			//this.particles = new Phaser.Particles(this);
			//this.plugins = new Phaser.PluginManager(this, this);
			//this.net = new Phaser.Net(this);
			//this.debug = new Phaser.Utils.Debug(this);

			this.stage.boot();
			this.world.boot();
			//this.input.boot();
			//this.sound.boot();
			//this.state.boot();

			this.load.onLoadComplete.add(this.loadComplete, this);

			if (this.renderType == Phaser.CANVAS)
			{
				console.log('%cPhaser initialized. Rendering to Canvas.', 'color: #ffff33; background: #000000');
			}
			else
			{
				console.log('%cPhaser initialized. Rendering to WebGL.', 'color: #ffff33; background: #000000');
			}

			var pos = Phaser.VERSION.indexOf('-');
            var versionQualifier = (pos >= 0) ? Phaser.VERSION.substr(pos + 1) : null;
            if (versionQualifier)
            {
                var article = ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(versionQualifier.charAt(0)) >= 0 ? 'an' : 'a';
                console.warn('You are using %s %s version of Phaser. Some things may not work.', article, versionQualifier);
            }

	        this.isRunning = true;
            this._loadComplete = false;

			this.raf = new Phaser.RequestAnimationFrame(this);
			this.raf.start();

		}

	},

	/**
	* Checks if the device is capable of using the requested renderer and sets it up or an alternative if not.
	*
	* @method Phaser.Game#setUpRenderer
	* @protected
	*/
	setUpRenderer: function () {

		if (this.renderType === Phaser.CANVAS || (this.renderType === Phaser.AUTO && this.device.webGL == false))
		{
			if (this.device.canvas)
			{
				this.renderType = Phaser.CANVAS;
				this.renderer = new PIXI.CanvasRenderer(this.width, this.height, this.stage.canvas, this.transparent);
				Phaser.Canvas.setSmoothingEnabled(this.renderer.context, this.antialias);
				this.canvas = this.renderer.view;
				this.context = this.renderer.context;
			}
			else
			{
				throw new Error('Phaser.Game - cannot create Canvas or WebGL context, aborting.');
			}
		}
		else
		{
			//	They requested WebGL, and their browser supports it
			this.renderType = Phaser.WEBGL;
			this.renderer = new PIXI.WebGLRenderer(this.width, this.height, this.stage.canvas, this.transparent, this.antialias);
			this.canvas = this.renderer.view;
			this.context = null;
		}

        Phaser.Canvas.addToDOM(this.renderer.view, this.parent, true);
        Phaser.Canvas.setTouchAction(this.renderer.view);

	},

	/**
    * Called when the load has finished, after preload was run.
    *
    * @method Phaser.Game#loadComplete
    * @protected
    */
    loadComplete: function () {

        this._loadComplete = true;

        this.state.loadComplete();

    },

	/**
    * The core game loop.
    *
    * @method Phaser.Game#update
    * @protected
	* @param {number} time - The current time as provided by RequestAnimationFrame.
    */
	update: function (time) {

		this.time.update(time);

		if (!this._paused)
		{
      //this.plugins.preUpdate();
      this.physics.preUpdate();

      this.stage.update();
      this.input.update();
      //this.tweens.update();
      //this.sound.update();
			this.world.update();
			//this.particles.update();
			this.state.update();
	    //this.plugins.update();

			this.world.postUpdate();

			this.renderer.render(this.stage._stage);
			//this.plugins.render();
			this.state.render();

			//this.plugins.postRender();
		}

	},

	/**
    * Nuke the entire game from orbit
    *
    * @method Phaser.Game#destroy
    */
    destroy: function () {

		this.raf.stop();

    	this.input.destroy();

    	this.state.destroy();

      this.state = null;
      this.cache = null;
      this.input = null;
      this.load = null;
      //this.sound = null;
      this.stage = null;
      this.time = null;
      this.world = null;
      this.isBooted = false;

    }

};

/**
* The paused state of the Game. A paused game doesn't update any of its subsystems.
* When a game is paused the onPause event is dispatched. When it is resumed the onResume event is dispatched.
* @name Phaser.Game#paused
* @property {boolean} paused - Gets and sets the paused state of the Game.
*/
Object.defineProperty(Phaser.Game.prototype, "paused", {

    get: function () {
        return this._paused;
    },

    set: function (value) {

    	if (value === true)
    	{
    		if (this._paused == false)
    		{
	    		this._paused = true;
	    		this.onPause.dispatch(this);
    		}
    	}
    	else
    	{
    		if (this._paused)
    		{
	    		this._paused = false;
	    		this.onResume.dispatch(this);
    		}
    	}

    }

});

/**
* "Deleted code is debugged code." - Jeff Sickel
*/

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Canvas class handles everything related to the &lt;canvas&gt; tag as a DOM Element, like styles, offset, aspect ratio
*
* @class Phaser.Canvas
* @static
*/
Phaser.Canvas = {

    /**
    * Creates the &lt;canvas&gt; tag
    *
    * @method Phaser.Canvas.create
    * @param {number} width - The desired width.
    * @param {number} height - The desired height.
    * @return {HTMLCanvasElement} The newly created &lt;canvas&gt; tag.
    */
    create: function (width, height) {

        width = width || 256;
        height = height || 256;

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.display = 'block';

        return canvas;

    },

    /**
    * Get the DOM offset values of any given element
    * @method Phaser.Canvas.getOffset
    * @param {HTMLElement} element - The targeted element that we want to retrieve the offset.
    * @param {Phaser.Point} [point] - The point we want to take the x/y values of the offset.
    * @return {Phaser.Point} - A point objet with the offsetX and Y as its properties.
    */    
    getOffset: function (element, point) {

        point = point || new Phaser.Point;

        var box = element.getBoundingClientRect();
        var clientTop = element.clientTop || document.body.clientTop || 0;
        var clientLeft = element.clientLeft || document.body.clientLeft || 0;
        var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
        var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

        point.x = box.left + scrollLeft - clientLeft;
        point.y = box.top + scrollTop - clientTop;

        return point;

    },

    /**
    * Returns the aspect ratio of the given canvas.
    *
    * @method Phaser.Canvas.getAspectRatio
    * @param {HTMLCanvasElement} canvas - The canvas to get the aspect ratio from.
    * @return {number} The ratio between canvas' width and height.
    */        
    getAspectRatio: function (canvas) {
        return canvas.width / canvas.height;
    },

    /**
    * Sets the background color behind the canvas. This changes the canvas style property.
    *
    * @method Phaser.Canvas.setBackgroundColor
    * @param {HTMLCanvasElement} canvas - The canvas to set the background color on.
    * @param {string} [color] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setBackgroundColor: function (canvas, color) {

        color = color || 'rgb(0,0,0)';

        canvas.style.backgroundColor = color;
        
        return canvas;

    },

    /**
    * Sets the touch-action property on the canvas style. Can be used to disable default browser touch actions.
    *
    * @method Phaser.Canvas.setTouchAction
    * @param {HTMLCanvasElement} canvas - The canvas to set the touch action on.
    * @param {String} [value] - The touch action to set. Defaults to 'none'.
    * @return {HTMLCanvasElement} The source canvas.
    */
    setTouchAction: function (canvas, value) {

        value = value || 'none';

        canvas.style.msTouchAction = value;
        canvas.style['ms-touch-action'] = value;
        canvas.style['touch-action'] = value;

        return canvas;

    },

    /**
    * Sets the user-select property on the canvas style. Can be used to disable default browser selection actions.
    *
    * @method Phaser.Canvas.setUserSelect
    * @param {HTMLCanvasElement} canvas - The canvas to set the touch action on.
    * @param {String} [value] - The touch action to set. Defaults to 'none'.
    * @return {HTMLCanvasElement} The source canvas.
    */
    setUserSelect: function (canvas, value) {

        value = value || 'none';

        canvas.style['-webkit-touch-callout'] = value;
        canvas.style['-webkit-user-select'] = value;
        canvas.style['-khtml-user-select'] = value;
        canvas.style['-moz-user-select'] = value;
        canvas.style['-ms-user-select'] = value;
        canvas.style['user-select'] = value;
        canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

        return canvas;

    },

    /**
    * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.
    * If no parent is given it will be added as a child of the document.body.
    *
    * @method Phaser.Canvas.addToDOM
    * @param {HTMLCanvasElement} canvas - The canvas to set the touch action on.
    * @param {string} parent - The DOM element to add the canvas to. Defaults to ''.
    * @param {boolean} overflowHidden - If set to true it will add the overflow='hidden' style to the parent DOM element.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    addToDOM: function (canvas, parent, overflowHidden) {

        parent = parent || '';

        if (typeof overflowHidden === 'undefined') { overflowHidden = true; }

        if (parent !== '')
        {
            if (document.getElementById(parent))
            {
                document.getElementById(parent).appendChild(canvas);

                if (overflowHidden)
                {
                    document.getElementById(parent).style.overflow = 'hidden';
                }
            }
            else
            {
                document.body.appendChild(canvas);
            }
        }
        else
        {
            document.body.appendChild(canvas);
        }

        return canvas;

    },

    /**
    * Sets the transform of the given canvas to the matrix values provided.
    *
    * @method Phaser.Canvas.setTransform
    * @param {CanvasRenderingContext2D} context - The context to set the transform on.
    * @param {number} translateX - The value to translate horizontally by.
    * @param {number} translateY - The value to translate vertically by.
    * @param {number} scaleX - The value to scale horizontally by.
    * @param {number} scaleY - The value to scale vertically by.
    * @param {number} skewX - The value to skew horizontaly by.
    * @param {number} skewY - The value to skew vertically by.
    * @return {CanvasRenderingContext2D} Returns the source context.
    */
    setTransform: function (context, translateX, translateY, scaleX, scaleY, skewX, skewY) {

        context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);

        return context;

    },

    /**
    * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.
    * By default browsers have image smoothing enabled, which isn't always what you visually want, especially
    * when using pixel art in a game. Note that this sets the property on the context itself, so that any image
    * drawn to the context will be affected. This sets the property across all current browsers but support is
    * patchy on earlier browsers, especially on mobile.
    *
    * @method Phaser.Canvas.setSmoothingEnabled
    * @param {CanvasRenderingContext2D} context - The context to enable or disable the image smoothing on.
    * @param {boolean} value - If set to true it will enable image smoothing, false will disable it.
    * @return {CanvasRenderingContext2D} Returns the source context.
    */
    setSmoothingEnabled: function (context, value) {

        context['imageSmoothingEnabled'] = value;
        context['mozImageSmoothingEnabled'] = value;
        context['oImageSmoothingEnabled'] = value;
        context['webkitImageSmoothingEnabled'] = value;
        context['msImageSmoothingEnabled'] = value;

        return context;

    },

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'crisp' (aka 'optimize contrast on webkit').
    * Note that if this doesn't given the desired result then see the setSmoothingEnabled.
    *
    * @method Phaser.Canvas.setImageRenderingCrisp
    * @param {HTMLCanvasElement} canvas - The canvas to set image-rendering crisp on.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setImageRenderingCrisp: function (canvas) {

        canvas.style['image-rendering'] = 'crisp-edges';
        canvas.style['image-rendering'] = '-moz-crisp-edges';
        canvas.style['image-rendering'] = '-webkit-optimize-contrast';
        canvas.style.msInterpolationMode = 'nearest-neighbor';

        return canvas;

    },

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').
    * Note that if this doesn't given the desired result then see the CanvasUtils.setSmoothingEnabled method.
    *
    * @method Phaser.Canvas.setImageRenderingBicubic
    * @param {HTMLCanvasElement} canvas The canvas to set image-rendering bicubic on.
    * @return {HTMLCanvasElement} Returns the source canvas.
    */
    setImageRenderingBicubic: function (canvas) {

        canvas.style['image-rendering'] = 'auto';
        canvas.style.msInterpolationMode = 'bicubic';

        return canvas;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* An Animation instance contains a single animation and the controls to play it.
* It is created by the AnimationManager, consists of Animation.Frame objects and belongs to a single Game Object such as a Sprite.
*
* @class Phaser.StageScaleMode 
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} width - Description.
* @param {number} height - Description.
*/
Phaser.StageScaleMode = function (game, width, height) {

    /**
    * @property {number} _startHeight - Stage height when starting the game.
    * @default
    * @private
    */
    this._startHeight = 0;

    /**
    * @property {boolean} forceLandscape - If the game should be forced to use Landscape mode, this is set to true by Game.Stage
    * @default
    */
    this.forceLandscape = false;

    /**
    * @property {boolean} forcePortrait - If the game should be forced to use Portrait mode, this is set to true by Game.Stage
    * @default
    */
     this.forcePortrait = false;

    /**
    * @property {boolean} incorrectOrientation - If the game should be forced to use a specific orientation and the device currently isn't in that orientation this is set to true.
    * @default
    */
    this.incorrectOrientation = false;

    /**
    * @property {boolean} pageAlignHorizontally - If you wish to align your game in the middle of the page then you can set this value to true.
    <ul><li>It will place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing.</li>
    <li>It doesn't care about any other DOM element that may be on the page, it literally just sets the margin.</li></ul>
    * @default
    */
    this.pageAlignHorizontally = false;

    /**
    * @property {boolean} pageAlignVertically - If you wish to align your game in the middle of the page then you can set this value to true.
    <ul><li>It will place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing.
    <li>It doesn't care about any other DOM element that may be on the page, it literally just sets the margin.</li></ul>
    * @default
    */
    this.pageAlignVertically = false;

    /**
    * @property {number} minWidth - Minimum width the canvas should be scaled to (in pixels).
    * @default
    */
    this.minWidth = null;

    /**
    * @property {number} maxWidth - Maximum width the canvas should be scaled to (in pixels).
    * If null it will scale to whatever width the browser can handle.
    * @default
    */
    this.maxWidth = null;

    /**
    * @property {number} minHeight - Minimum height the canvas should be scaled to (in pixels).
    * @default
    */
    this.minHeight = null;

    /**
    * @property {number} maxHeight - Maximum height the canvas should be scaled to (in pixels).
    * If null it will scale to whatever height the browser can handle.
    * @default
    */
    this.maxHeight = null;

    /**
    * @property {number} width - Width of the stage after calculation.
    * @default
    */
    this.width = 0;

    /**
    * @property {number} height - Height of the stage after calculation.
    * @default
    */
    this.height = 0;

    /**
    * @property {number} maxIterations - The maximum number of times it will try to resize the canvas to fill the browser.
    * @default
    */
    this.maxIterations = 5;
    
    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {Description} enterLandscape - Description.
    */
    this.enterLandscape = new Phaser.Signal();

    /**
    * @property {Description} enterPortrait - Description.
    */
    this.enterPortrait = new Phaser.Signal();

    if (window['orientation'])
    {
        this.orientation = window['orientation'];
    }
    else
    {
        if (window.outerWidth > window.outerHeight)
        {
            this.orientation = 90;
        }
        else
        {
            this.orientation = 0;
        }
    }

    /**
    * @property {Description} scaleFactor - Description.
    */
    this.scaleFactor = new Phaser.Point(1, 1);

    /**
    * @property {number} aspectRatio - Aspect ratio.
    * @default
    */
    this.aspectRatio = 0;

    var _this = this;

    window.addEventListener('orientationchange', function (event) {
        return _this.checkOrientation(event);
    }, false);

    window.addEventListener('resize', function (event) {
        return _this.checkResize(event);
    }, false);
	
};

/**
* @constant
* @type {number}
*/
Phaser.StageScaleMode.EXACT_FIT = 0;

/**
* @constant
* @type {number}
*/
Phaser.StageScaleMode.NO_SCALE = 1;

/**
* @constant
* @type {number}
*/
Phaser.StageScaleMode.SHOW_ALL = 2;

Phaser.StageScaleMode.prototype = {

    /**
    * Tries to enter the browser into full screen mode.
    * Please note that this needs to be supported by the web browser and isn't the same thing as setting your game to fill the browser.
    * @method Phaser.StageScaleMode#startFullScreen
    */
    startFullScreen: function () {

        if (this.isFullScreen)
        {
            return;
        }

        var element = this.game.canvas;
        
        if (element['requestFullScreen'])
        {
            element['requestFullScreen']();
        }
        else if (element['mozRequestFullScreen'])
        {
            element['mozRequestFullScreen']();
        }
        else if (element['webkitRequestFullScreen'])
        {
            element['webkitRequestFullScreen'](Element.ALLOW_KEYBOARD_INPUT);
        }

        this.game.stage.canvas.style['width'] = '100%';
        this.game.stage.canvas.style['height'] = '100%';

    },

    /**
    * Stops full screen mode if the browser is in it.
    * @method Phaser.StageScaleMode#stopFullScreen
    */
    stopFullScreen: function () {

        if (document['cancelFullScreen'])
        {
            document['cancelFullScreen']();
        }
        else if (document['mozCancelFullScreen'])
        {
            document['mozCancelFullScreen']();
        }
        else if (document['webkitCancelFullScreen'])
        {
            document['webkitCancelFullScreen']();
        }

    },

    /**
    * Checks if the browser is in the correct orientation for your game (if forceLandscape or forcePortrait have been set)
    * @method Phaser.StageScaleMode#checkOrientationState
    */
    checkOrientationState: function () {

        //  They are in the wrong orientation
        if (this.incorrectOrientation)
        {
            if ((this.forceLandscape && window.innerWidth > window.innerHeight) || (this.forcePortrait && window.innerHeight > window.innerWidth))
            {
                //  Back to normal
                this.game.paused = false;
                this.incorrectOrientation = false;
                this.refresh();
            }
        }
        else
        {
            if ((this.forceLandscape && window.innerWidth < window.innerHeight) || (this.forcePortrait && window.innerHeight < window.innerWidth))
            {
                //  Show orientation screen
                this.game.paused = true;
                this.incorrectOrientation = true;
                this.refresh();
            }
        }
    },

    /**
    * Handle window.orientationchange events
    * @method Phaser.StageScaleMode#checkOrientation
    * @param {Event} event - The orientationchange event data.
    */
    checkOrientation: function (event) {

        this.orientation = window['orientation'];

        if (this.isLandscape)
        {
            this.enterLandscape.dispatch(this.orientation, true, false);
        }
        else
        {
            this.enterPortrait.dispatch(this.orientation, false, true);
        }

        if (this.game.stage.scaleMode !== Phaser.StageScaleMode.NO_SCALE)
        {
            this.refresh();
        }

    },

    /**
    * Handle window.resize events
    * @method Phaser.StageScaleMode#checkResize
    * @param {Event} event - The resize event data.
    */
    checkResize: function (event) {

        if (window.outerWidth > window.outerHeight)
        {
            this.orientation = 90;
        }
        else
        {
            this.orientation = 0;
        }

        if (this.isLandscape)
        {
            this.enterLandscape.dispatch(this.orientation, true, false);
        }
        else
        {
            this.enterPortrait.dispatch(this.orientation, false, true);
        }

        if (this.game.stage.scaleMode !== Phaser.StageScaleMode.NO_SCALE)
        {
            this.refresh();
        }
    },

    /**
    * Re-calculate scale mode and update screen size.
    * @method Phaser.StageScaleMode#refresh
    */
    refresh: function () {

        var _this = this;
        
        //  We can't do anything about the status bars in iPads, web apps or desktops
        if (this.game.device.iPad == false && this.game.device.webApp == false && this.game.device.desktop == false)
        {
            // document.documentElement['style'].minHeight = '2000px';
            // this._startHeight = window.innerHeight;

            if (this.game.device.android && this.game.device.chrome == false)
            {
                window.scrollTo(0, 1);
            }
            else
            {
                window.scrollTo(0, 0);
            }
        }

        if (this._check == null && this.maxIterations > 0)
        {
            this._iterations = this.maxIterations;
            this._check = window.setInterval(function () {
                return _this.setScreenSize();
            }, 10);
            this.setScreenSize();
        }

    },

    /**
    * Set screen size automatically based on the scaleMode.
    * @param {Description} force - If force is true it will try to resize the game regardless of the document dimensions.
    */
    setScreenSize: function (force) {

        if (typeof force == 'undefined')
        {
            force = false;
        }
        
        if (this.game.device.iPad == false && this.game.device.webApp == false && this.game.device.desktop == false) 
        {
            if (this.game.device.android && this.game.device.chrome == false)
            {
                window.scrollTo(0, 1);
            }
            else
            {
                window.scrollTo(0, 0);
            }
        }

        this._iterations--;

        if (force || window.innerHeight > this._startHeight || this._iterations < 0)
        {
            // Set minimum height of content to new window height
            document.documentElement['style'].minHeight = window.innerHeight + 'px';
        
            if (this.incorrectOrientation == true)
            {
                this.setMaximum();
            }
            else if (this.game.stage.scaleMode == Phaser.StageScaleMode.EXACT_FIT)
            {
                this.setExactFit();
            }
            else if (this.game.stage.scaleMode == Phaser.StageScaleMode.SHOW_ALL)
            {
                this.setShowAll();
            }

            this.setSize();
            clearInterval(this._check);
            this._check = null;
        }

    },

    /**
    * Sets the canvas style width and height values based on minWidth/Height and maxWidth/Height.
    * @method Phaser.StageScaleMode#setSize
    */
    setSize: function () {

        if (this.incorrectOrientation == false)
        {
            if (this.maxWidth && this.width > this.maxWidth)
            {
                this.width = this.maxWidth;
            }

            if (this.maxHeight && this.height > this.maxHeight)
            {
                this.height = this.maxHeight;
            }

            if (this.minWidth && this.width < this.minWidth)
            {
                this.width = this.minWidth;
            }

            if (this.minHeight && this.height < this.minHeight)
            {
                this.height = this.minHeight;
            }
        }

        this.game.canvas.style.width = this.width + 'px';
        this.game.canvas.style.height = this.height + 'px';
        
        this.game.input.scale.setTo(this.game.width / this.width, this.game.height / this.height);

        if (this.pageAlignHorizontally)
        {
            if (this.width < window.innerWidth && this.incorrectOrientation == false)
            {
                this.game.canvas.style.marginLeft = Math.round((window.innerWidth - this.width) / 2) + 'px';
            }
            else
            {
                this.game.canvas.style.marginLeft = '0px';
            }
        }

        if (this.pageAlignVertically)
        {
            if (this.height < window.innerHeight && this.incorrectOrientation == false)
            {
                this.game.canvas.style.marginTop = Math.round((window.innerHeight - this.height) / 2) + 'px';
            }
            else
            {
                this.game.canvas.style.marginTop = '0px';
            }
        }

        Phaser.Canvas.getOffset(this.game.canvas, this.game.stage.offset);
        
        this.aspectRatio = this.width / this.height;
        
        this.scaleFactor.x = this.game.width / this.width;
        this.scaleFactor.y = this.game.height / this.height;

    },

    /**
    * Sets this.width equal to window.innerWidth and this.height equal to window.innerHeight
    * @method Phaser.StageScaleMode#setMaximum
    */
    setMaximum: function () {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

    },

    /**
    * Calculates the multiplier needed to scale the game proportionally.
    * @method Phaser.StageScaleMode#setShowAll
    */
    setShowAll: function () {

        var multiplier = Math.min((window.innerHeight / this.game.height), (window.innerWidth / this.game.width));

        this.width = Math.round(this.game.width * multiplier);
        this.height = Math.round(this.game.height * multiplier);

    },

    /**
    * Sets the width and height values of the canvas, no larger than the maxWidth/Height.
    * @method Phaser.StageScaleMode#setExactFit
    */
    setExactFit: function () {

        var availableWidth = window.innerWidth - 0;
        var availableHeight = window.innerHeight - 5;

        // console.log('available', availableWidth, availableHeight);

        if (this.maxWidth && availableWidth > this.maxWidth)
        {
            this.width = this.maxWidth;
        }
        else
        {
            this.width = availableWidth;
        }

        if (this.maxHeight && availableHeight > this.maxHeight)
        {
            this.height = this.maxHeight;
        }
        else
        {
            this.height = availableHeight;
        }

        console.log('setExactFit', this.width, this.height, this.game.stage.offset);

    }

};

/**
* @name Phaser.StageScaleMode#isFullScreen
* @property {boolean} isFullScreen - Returns true if the browser is in full screen mode, otherwise false.
* @readonly
*/
Object.defineProperty(Phaser.StageScaleMode.prototype, "isFullScreen", {

    get: function () {

        if (document['fullscreenElement'] === null || document['mozFullScreenElement'] === null || document['webkitFullscreenElement'] === null)
        {
            return false;
        }

        return true;

    }

});

/**
* @name Phaser.StageScaleMode#isPortrait
* @property {boolean} isPortrait - Returns true if the browser dimensions match a portrait display.
* @readonly
*/
Object.defineProperty(Phaser.StageScaleMode.prototype, "isPortrait", {

    get: function () {
        return this.orientation == 0 || this.orientation == 180;
    }

});

/**
* @name Phaser.StageScaleMode#isLandscape
* @property {boolean} isLandscape - Returns true if the browser dimensions match a landscape display.
* @readonly
*/
Object.defineProperty(Phaser.StageScaleMode.prototype, "isLandscape", {

    get: function () {
        return this.orientation === 90 || this.orientation === -90;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Detects device support capabilities. Using some elements from System.js by MrDoob and Modernizr
*
* @class Phaser.Device
* @constructor
*/

Phaser.Device = function () {

    /**
    * An optional 'fix' for the horrendous Android stock browser bug https://code.google.com/p/android/issues/detail?id=39247
    * @property {boolean} patchAndroidClearRectBug - Description.
    * @default
    */
    this.patchAndroidClearRectBug = false;

    //  Operating System

    /**
    * @property {boolean} desktop - Is running desktop?
    * @default
    */
    this.desktop = false;

    /**
    * @property {boolean} iOS - Is running on iOS?
    * @default
    */
    this.iOS = false;

    /**
    * @property {boolean} android - Is running on android?
    * @default
    */
    this.android = false;

    /**
    * @property {boolean} chromeOS - Is running on chromeOS?
    * @default
    */
    this.chromeOS = false;

    /**
    * @property {boolean} linux - Is running on linux?
    * @default
    */
    this.linux = false;

    /**
    * @property {boolean} macOS - Is running on macOS?
    * @default
    */
    this.macOS = false;

    /**
    * @property {boolean} windows - Is running on windows?
    * @default
    */
    this.windows = false;

    //  Features

    /**
    * @property {boolean} canvas - Is canvas available?
    * @default
    */
    this.canvas = false;

    /**
    * @property {boolean} file - Is file available?
    * @default
    */
    this.file = false;

    /**
    * @property {boolean} fileSystem - Is fileSystem available?
    * @default
    */
    this.fileSystem = false;

    /**
    * @property {boolean} localStorage - Is localStorage available?
    * @default
    */
    this.localStorage = false;

    /**
    * @property {boolean} webGL - Is webGL available?
    * @default
    */
    this.webGL = false;

    /**
    * @property {boolean} worker - Is worker available?
    * @default
    */
    this.worker = false;

    /**
    * @property {boolean} touch - Is touch available?
    * @default
    */
    this.touch = false;

    /**
    * @property {boolean} mspointer - Is mspointer available?
    * @default
    */
    this.mspointer = false;

    /**
    * @property {boolean} css3D - Is css3D available?
    * @default
    */
    this.css3D = false;

    /** 
    * @property {boolean} pointerLock - Is Pointer Lock available?
    * @default
    */
    this.pointerLock = false;

    //  Browser

    /**
    * @property {boolean} arora - Is running in arora?
    * @default
    */
    this.arora = false;

    /**
    * @property {boolean} chrome - Is running in chrome?
    * @default
    */
    this.chrome = false;

    /**
    * @property {boolean} epiphany - Is running in epiphany?
    * @default
    */
    this.epiphany = false;

    /**
    * @property {boolean} firefox - Is running in firefox?
    * @default
    */
    this.firefox = false;

    /**
    * @property {boolean} ie - Is running in ie?
    * @default
    */
    this.ie = false;

    /**
    * @property {number} ieVersion - Version of ie?
    * @default
    */
    this.ieVersion = 0;

    /**
    * @property {boolean} mobileSafari - Is running in mobileSafari?
    * @default
    */
    this.mobileSafari = false;

    /**
    * @property {boolean} midori - Is running in midori?
    * @default
    */
    this.midori = false;

    /**
    * @property {boolean} opera - Is running in opera?
    * @default
    */
    this.opera = false;

    /**
    * @property {boolean} safari - Is running in safari?
    * @default
    */
    this.safari = false;
    this.webApp = false;

    //  Audio

    /**
    * @property {boolean} audioData - Are Audio tags available?
    * @default
    */
    this.audioData = false;

    /**
    * @property {boolean} webAudio - Is the WebAudio API available?
    * @default
    */
    this.webAudio = false;

    /**
    * @property {boolean} ogg - Can this device play ogg files?
    * @default
    */
    this.ogg = false;

    /**
    * @property {boolean} opus - Can this device play opus files?
    * @default
    */
    this.opus = false;

    /**
    * @property {boolean} mp3 - Can this device play mp3 files?
    * @default
    */
    this.mp3 = false;

    /**
    * @property {boolean} wav - Can this device play wav files?
    * @default
    */
    this.wav = false;
    /**
    * Can this device play m4a files?
    * @property {boolean} m4a - True if this device can play m4a files.
    * @default
    */
    this.m4a = false;

    /**
    * @property {boolean} webm - Can this device play webm files?
    * @default
    */
    this.webm = false;

    //  Device

    /**
    * @property {boolean} iPhone - Is running on iPhone?
    * @default
    */
    this.iPhone = false;

    /**
    * @property {boolean} iPhone4 - Is running on iPhone4?
    * @default
    */
    this.iPhone4 = false;

    /** 
    * @property {boolean} iPad - Is running on iPad?
    * @default
    */
    this.iPad = false;

    /**
    * @property {number} pixelRatio - PixelRatio of the host device?
    * @default
    */
    this.pixelRatio = 0;

    //  Run the checks
    this._checkAudio();
    this._checkBrowser();
    this._checkCSS3D();
    this._checkDevice();
    this._checkFeatures();
    this._checkOS();
    
};

Phaser.Device.prototype = {

    /**
    * Check which OS is game running on.
    * @method Phaser.Device#_checkOS
    * @private
    */
    _checkOS: function () {

        var ua = navigator.userAgent;

        if (/Android/.test(ua)) {
            this.android = true;
        } else if (/CrOS/.test(ua)) {
            this.chromeOS = true;
        } else if (/iP[ao]d|iPhone/i.test(ua)) {
            this.iOS = true;
        } else if (/Linux/.test(ua)) {
            this.linux = true;
        } else if (/Mac OS/.test(ua)) {
            this.macOS = true;
        } else if (/Windows/.test(ua)) {
            this.windows = true;
        }

        if (this.windows || this.macOS || this.linux) {
            this.desktop = true;
        }

    },

    /**
    * Check HTML5 features of the host environment.
    * @method Phaser.Device#_checkFeatures
    * @private
    */
    _checkFeatures: function () {

        this.canvas = !!window['CanvasRenderingContext2D'];

        try {
            this.localStorage = !!localStorage.getItem;
        } catch (error) {
            this.localStorage = false;
        }

        this.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
        this.fileSystem = !!window['requestFileSystem'];
        this.webGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

        if (this.webGL === null)
        {
            this.webGL = false;
        }
        else
        {
            this.webGL = true;
        }

        this.worker = !!window['Worker'];
        
        if ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) {
            this.touch = true;
        }

        if (window.navigator.msPointerEnabled) {
            this.mspointer = true;
        }
        
        this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    },

    /**
    * Check what browser is game running in.
    * @method Phaser.Device#_checkBrowser
    * @private
    */
    _checkBrowser: function () {

        var ua = navigator.userAgent;

        if (/Arora/.test(ua)) {
            this.arora = true;
        } else if (/Chrome/.test(ua)) {
            this.chrome = true;
        } else if (/Epiphany/.test(ua)) {
            this.epiphany = true;
        } else if (/Firefox/.test(ua)) {
            this.firefox = true;
        } else if (/Mobile Safari/.test(ua)) {
            this.mobileSafari = true;
        } else if (/MSIE (\d+\.\d+);/.test(ua)) {
            this.ie = true;
            this.ieVersion = parseInt(RegExp.$1);
        } else if (/Midori/.test(ua)) {
            this.midori = true;
        } else if (/Opera/.test(ua)) {
            this.opera = true;
        } else if (/Safari/.test(ua)) {
            this.safari = true;
        }

        // WebApp mode in iOS
        if (navigator['standalone']) {
            this.webApp = true;
        }

    },

    /**
    * Check audio support.
    * @method Phaser.Device#_checkAudio
    * @private
    */
    _checkAudio: function () {

        this.audioData = !!(window['Audio']);
        this.webAudio = !!(window['webkitAudioContext'] || window['AudioContext']);
        var audioElement = document.createElement('audio');
        var result = false;

        try {
            if (result = !!audioElement.canPlayType) {
                
                if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
                    this.ogg = true;
                }

                if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')) {
                    this.opus = true;
                }

                if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
                    this.mp3 = true;
                }

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
                    this.wav = true;
                }

                if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
                    this.m4a = true;
                }

                if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
                    this.webm = true;
                }
            }
        } catch (e) {
        }

    },

    /**
    * Check PixelRatio of devices.
    * @method Phaser.Device#_checkDevice
    * @private
    */
    _checkDevice: function () {

        this.pixelRatio = window['devicePixelRatio'] || 1;
        this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
        this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
        this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;

    },

    /**
    * Check whether the host environment support 3D CSS.
    * @method Phaser.Device#_checkCSS3D
    * @private
    */
    _checkCSS3D: function () {

        var el = document.createElement('p');
        var has3d;
        var transforms = {
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }
        
        document.body.removeChild(el);
        this.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    },

    /**
    * Check whether the host environment can play audio.
    * @method Phaser.Device#canPlayAudio
    * @param {string} type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm'.
    * @return {boolean} True if the given file type is supported by the browser, otherwise false.
    */
    canPlayAudio: function (type) {

        if (type == 'mp3' && this.mp3)
        {
            return true;
        }
        else if (type == 'ogg' && (this.ogg || this.opus))
        {
            return true;
        }
        else if (type == 'm4a' && this.m4a)
        {
            return true;
        }
        else if (type == 'wav' && this.wav)
        {
            return true;
        }
        else if (type == 'webm' && this.webm)
        {
            return true;
        }

        return false;

    },

    /**
    * Check whether the console is open.
    * @method Phaser.Device#isConsoleOpen
    * @return {boolean} True if the browser dev console is open.
    */
    isConsoleOpen: function () {

        if (window.console && window.console['firebug'])
        {
            return true;
        }

        if (window.console)
        {
            console.profile();
            console.profileEnd();

            if (console.clear)
            {
                console.clear();
            }

            return console['profiles'].length > 0;
        }

        return false;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Point. If you pass no parameters a Point is created set to (0,0).
* @class Phaser.Point
* @classdesc The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
* @constructor
* @param {number} x The horizontal position of this Point (default 0)
* @param {number} y The vertical position of this Point (default 0)
**/
Phaser.Point = function (x, y) {

    x = x || 0;
    y = y || 0;

    /**
     * @property {number} x - The x coordinate of the point.
     **/
    this.x = x;
    
    /**
     * @property {number} y - The y coordinate of the point.
     **/
    this.y = y;

};

Phaser.Point.prototype = {

    /**
    * Copies the x and y properties from any given object to this Point.
    * @method Phaser.Point#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Point} This Point object.
    **/
    copyFrom: function (source) {
        return this.setTo(source.x, source.y);
    },

    /**
    * Inverts the x and y values of this Point
    * @method Phaser.Point#invert
    * @return {Point} This Point object.
    **/
    invert: function () {
        return this.setTo(this.y, this.x);
    },

    /**
    * Sets the x and y values of this Point object to the given coordinates.
    * @method Phaser.Point#setTo
    * @param {number} x - The horizontal position of this point.
    * @param {number} y - The vertical position of this point.
    * @return {Point} This Point object. Useful for chaining method calls.
    **/        
    setTo: function (x, y) {

        this.x = x;
        this.y = y;
        return this;
        
    },

    /**
    * Adds the given x and y values to this Point.
    * @method Phaser.Point#add
    * @param {number} x - The value to add to Point.x.
    * @param {number} y - The value to add to Point.y.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    **/        
    add: function (x, y) {

        this.x += x;
        this.y += y;
        return this;

    },

    /**
    * Subtracts the given x and y values from this Point.
    * @method Phaser.Point#subtract
    * @param {number} x - The value to subtract from Point.x.
    * @param {number} y - The value to subtract from Point.y.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    **/        
    subtract: function (x, y) {

        this.x -= x;
        this.y -= y;
        return this;

    },

    /**
    * Multiplies Point.x and Point.y by the given x and y values.
    * @method Phaser.Point#multiply
    * @param {number} x - The value to multiply Point.x by.
    * @param {number} y - The value to multiply Point.x by.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    **/        
    multiply: function (x, y) {

        this.x *= x;
        this.y *= y;
        return this;

    },

    /**
    * Divides Point.x and Point.y by the given x and y values.
    * @method Phaser.Point#divide
    * @param {number} x - The value to divide Point.x by.
    * @param {number} y - The value to divide Point.x by.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    **/        
    divide: function (x, y) {

        this.x /= x;
        this.y /= y;
        return this;

    },

    /**
    * Clamps the x value of this Point to be between the given min and max.
    * @method Phaser.Point#clampX
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clampX: function (min, max) {

        this.x = Phaser.Math.clamp(this.x, min, max);
        return this;
        
    },

    /**
    * Clamps the y value of this Point to be between the given min and max
    * @method Phaser.Point#clampY
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clampY: function (min, max) {

        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;
        
    },

    /**
    * Clamps this Point object values to be between the given min and max.
    * @method Phaser.Point#clamp
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clamp: function (min, max) {

        this.x = Phaser.Math.clamp(this.x, min, max);
        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;

    },

    /**
    * Creates a copy of the given Point.
    * @method Phaser.Point#clone
    * @param {Phaser.Point} [output] Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
    * @return {Phaser.Point} The new Point object.
    */
    clone: function (output) {

        if (typeof output === "undefined") { output = new Phaser.Point; }

        return output.setTo(this.x, this.y);

    },

    /**
    * Copies the x and y properties from any given object to this Point.
    * @method Phaser.Point#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Point} This Point object.
    **/
    copyFrom: function (source) {
        return this.setTo(source.x, source.y);
    },

    /**
    * Copies the x and y properties from this Point to any given object.
    * @method Phaser.Point#copyTo
    * @param {any} dest - The object to copy to.
    * @return {Object} The dest object.
    **/
    copyTo: function(dest) {

        dest[x] = this.x;
        dest[y] = this.y;

        return dest;

    },

    /**
    * Returns the distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties)
    * @method Phaser.Point#distance
    * @param {object} dest - The target object. Must have visible x and y properties that represent the center of the object.
    * @param {boolean} [round] - Round the distance to the nearest integer (default false).
    * @return {number} The distance between this Point object and the destination Point object.
    */
    distance: function (dest, round) {

        return Phaser.Point.distance(this, dest, round);
        
    },

    /**
    * Determines whether the given objects x/y values are equal to this Point object.
    * @method Phaser.Point#equals
    * @param {Phaser.Point} a - The first object to compare.
    * @return {boolean} A value of true if the Points are equal, otherwise false.
    */
    equals: function (a) {
        return (a.x == this.x && a.y == this.y);
    },

    /**
    * Rotates this Point around the x/y coordinates given to the desired angle.
    * @method Phaser.Point#rotate
    * @param {number} x - The x coordinate of the anchor point
    * @param {number} y - The y coordinate of the anchor point
    * @param {number} angle - The angle in radians (unless asDegrees is true) to rotate the Point to.
    * @param {boolean} asDegrees - Is the given rotation in radians (false) or degrees (true)?
    * @param {number} [distance] - An optional distance constraint between the Point and the anchor.
    * @return {Phaser.Point} The modified point object.
    */
    rotate: function (x, y, angle, asDegrees, distance) {
        return Phaser.Point.rotate(this, x, y, angle, asDegrees, distance);
    },

    /**
    * Returns a string representation of this object.
    * @method Phaser.Point#toString
    * @return {string} A string representation of the instance.
    **/
    toString: function () {
        return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';
    }

};

/**
* Adds the coordinates of two points together to create a new point.
* @method Phaser.Point.add
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.add = function (a, b, out) {

    if (typeof out === "undefined") { out = new Phaser.Point(); }

    out.x = a.x + b.x;
    out.y = a.y + b.y;

    return out;

};

/**
* Subtracts the coordinates of two points to create a new point.
* @method Phaser.Point.subtract
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.subtract = function (a, b, out) {

    if (typeof out === "undefined") { out = new Phaser.Point(); }

    out.x = a.x - b.x;
    out.y = a.y - b.y;

    return out;

};

/**
* Multiplies the coordinates of two points to create a new point.
* @method Phaser.Point.multiply
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.multiply = function (a, b, out) {

    if (typeof out === "undefined") { out = new Phaser.Point(); }

    out.x = a.x * b.x;
    out.y = a.y * b.y;

    return out;

};

/**
* Divides the coordinates of two points to create a new point.
* @method Phaser.Point.divide
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.divide = function (a, b, out) {

    if (typeof out === "undefined") { out = new Phaser.Point(); }

    out.x = a.x / b.x;
    out.y = a.y / b.y;

    return out;

};

/**
* Determines whether the two given Point objects are equal. They are considered equal if they have the same x and y values.
* @method Phaser.Point.equals
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @return {boolean} A value of true if the Points are equal, otherwise false.
*/
Phaser.Point.equals = function (a, b) {
    return (a.x == b.x && a.y == b.y);
};

/**
* Returns the distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties).
* @method Phaser.Point.distance
* @param {object} a - The target object. Must have visible x and y properties that represent the center of the object.
* @param {object} b - The target object. Must have visible x and y properties that represent the center of the object.
* @param {boolean} [round] - Round the distance to the nearest integer (default false).
* @return {number} The distance between this Point object and the destination Point object.
*/
Phaser.Point.distance = function (a, b, round) {

    if (typeof round === "undefined") { round = false }

    if (round)
    {
        return Phaser.Math.distanceRound(a.x, a.y, b.x, b.y);
    }
    else
    {
        return Phaser.Math.distance(a.x, a.y, b.x, b.y);
    }

},

/**
* Rotates a Point around the x/y coordinates given to the desired angle.
* @method Phaser.Point.rotate
* @param {Phaser.Point} a - The Point object to rotate.
* @param {number} x - The x coordinate of the anchor point
* @param {number} y - The y coordinate of the anchor point
* @param {number} angle - The angle in radians (unless asDegrees is true) to rotate the Point to.
* @param {boolean} asDegrees - Is the given rotation in radians (false) or degrees (true)?
* @param {number} distance - An optional distance constraint between the Point and the anchor.
* @return {Phaser.Point} The modified point object.
*/
Phaser.Point.rotate = function (a, x, y, angle, asDegrees, distance) {

    asDegrees = asDegrees || false;
    distance = distance || null;

    if (asDegrees)
    {
        angle = Phaser.Math.radToDeg(angle);
    }

    //  Get distance from origin (cx/cy) to this point
    if (distance === null)
    {
        distance = Math.sqrt(((x - a.x) * (x - a.x)) + ((y - a.y) * (y - a.y)));
    }

    return a.setTo(x + distance * Math.cos(angle), y + distance * Math.sin(angle));

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters. If you call this function without parameters, a Rectangle with x, y, width, and height properties set to 0 is created.
*
* @class Phaser.Rectangle
* @constructor
* @param {number} x - The x coordinate of the top-left corner of the Rectangle.
* @param {number} y - The y coordinate of the top-left corner of the Rectangle.
* @param {number} width - The width of the Rectangle in pixels.
* @param {number} height - The height of the Rectangle in pixels.
* @return {Rectangle} This Rectangle object.
**/
Phaser.Rectangle = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    /**
    * @property {number} x - Description.
    */
    this.x = x;
    
    /**
    * @property {number} y - Description.
    */
    this.y = y;
    
    /**
    * @property {number} width - Description.
    */
    this.width = width;
    
    /**
    * @property {number} height - Description.
    */
    this.height = height;

};

Phaser.Rectangle.prototype = {

    /**
    * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
    * @method Phaser.Rectangle#offset
    * @param {number} dx - Moves the x value of the Rectangle object by this amount.
    * @param {number} dy - Moves the y value of the Rectangle object by this amount.
    * @return {Rectangle} This Rectangle object.
    **/
    offset: function (dx, dy) {

        this.x += dx;
        this.y += dy;

        return this;

    },
 
    /**
    * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
    * @method Phaser.Rectangle#offsetPoint
    * @param {Point} point - A Point object to use to offset this Rectangle object.
    * @return {Rectangle} This Rectangle object.
    **/
    offsetPoint: function (point) {
        return this.offset(point.x, point.y);
    },
 
    /**
    * Sets the members of Rectangle to the specified values.
    * @method Phaser.Rectangle#setTo
    * @param {number} x - The x coordinate of the top-left corner of the Rectangle.
    * @param {number} y - The y coordinate of the top-left corner of the Rectangle.
    * @param {number} width - The width of the Rectangle in pixels.
    * @param {number} height - The height of the Rectangle in pixels.
    * @return {Rectangle} This Rectangle object
    **/
    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },
 
    /**
    * Runs Math.floor() on both the x and y values of this Rectangle.
    * @method Phaser.Rectangle#floor
    **/
    floor: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    },
 
    /**
    * Runs Math.floor() on the x, y, width and height values of this Rectangle.
    * @method Phaser.Rectangle#floorAll
    **/
    floorAll: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);

    },

    /**
    * Copies the x, y, width and height properties from any given object to this Rectangle.
    * @method Phaser.Rectangle#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Rectangle} This Rectangle object.
    **/
    copyFrom: function (source) {
        return this.setTo(source.x, source.y, source.width, source.height);
    },

    /**
    * Copies the x, y, width and height properties from this Rectangle to any given object.
    * @method Phaser.Rectangle#copyTo
    * @param {any} source - The object to copy to.
    * @return {object} This object.
    **/
    copyTo: function (dest) {

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    },

    /**
    * Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
    * @method Phaser.Rectangle#inflate
    * @param {number} dx - The amount to be added to the left side of the Rectangle.
    * @param {number} dy - The amount to be added to the bottom side of the Rectangle.
    * @return {Phaser.Rectangle} This Rectangle object.
    */
    inflate: function (dx, dy) {
        return Phaser.Rectangle.inflate(this, dx, dy);
    },

    /**
    * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
    * @method Phaser.Rectangle#size
    * @param {Phaser.Point} [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
    * @return {Phaser.Point} The size of the Rectangle object.
    */
    size: function (output) {
        return Phaser.Rectangle.size(this, output);
    },

    /**
    * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
    * @method Phaser.Rectangle#clone
    * @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle} 
    */
    clone: function (output) {
        return Phaser.Rectangle.clone(this, output);
    },

    /**
    * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
    * @method Phaser.Rectangle#contains
    * @param {number} x - The x coordinate of the point to test.
    * @param {number} y - The y coordinate of the point to test.
    * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    contains: function (x, y) {
        return Phaser.Rectangle.contains(this, x, y);
    },

    /**
    * Determines whether the first Rectangle object is fully contained within the second Rectangle object.
    * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
    * @method Phaser.Rectangle#containsRect
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    containsRect: function (b) {
        return Phaser.Rectangle.containsRect(this, b);
    },

    /**
    * Determines whether the two Rectangles are equal.
    * This method compares the x, y, width and height properties of each Rectangle.
    * @method Phaser.Rectangle#equals
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @return {boolean} A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
    */
    equals: function (b) {
        return Phaser.Rectangle.equals(this, b);
    },

    /**
    * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
    * @method Phaser.Rectangle#intersection
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @param {Phaser.Rectangle} out - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle} A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
    */
    intersection: function (b, out) {
        return Phaser.Rectangle.intersection(this, b, output);
    },

    /**
    * Determines whether the two Rectangles intersect with each other.
    * This method checks the x, y, width, and height properties of the Rectangles.
    * @method Phaser.Rectangle#intersects
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0.
    * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
    */
    intersects: function (b, tolerance) {
        return Phaser.Rectangle.intersects(this, b, tolerance);
    },

    /**
    * Determines whether the object specified intersects (overlaps) with the given values.
    * @method Phaser.Rectangle#intersectsRaw
    * @param {number} left - Description.
    * @param {number} right - Description.
    * @param {number} top - Description.
    * @param {number} bottomt - Description.
    * @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
    * @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
    */
    intersectsRaw: function (left, right, top, bottom, tolerance) {
        return Phaser.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);
    },

    /**
    * Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
    * @method Phaser.Rectangle#union
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @param {Phaser.Rectangle} [out] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle} A Rectangle object that is the union of the two Rectangles.
    */
    union: function (b, out) {
        return Phaser.Rectangle.union(this, b, out);
    },

    /**
    * Returns a string representation of this object.
    * @method Phaser.Rectangle#toString
    * @return {string} A string representation of the instance.
    **/
    toString: function () {
        return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " empty=" + this.empty + ")}]";
    }

};

/**
* @name Phaser.Rectangle#halfWidth
* @property {number} halfWidth - Half of the width of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfWidth", {

    get: function () {
        return Math.round(this.width / 2);
    }

});

/**
* @name Phaser.Rectangle#halfHeight
* @property {number} halfHeight - Half of the height of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfHeight", {

    get: function () {
        return Math.round(this.height / 2);
    }

});

/**
* The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
* @name Phaser.Rectangle#bottom
* @property {number} bottom - The sum of the y and height properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottom", {
    
    get: function () {
        return this.y + this.height;
    },
  
    set: function (value) {
        if (value <= this.y) {
            this.height = 0;
        } else {
            this.height = (this.y - value);
        }
    }

});

/**
* The location of the Rectangles bottom right corner as a Point object.
* @name Phaser.Rectangle#bottom
* @property {Phaser.Point} bottomRight - Gets or sets the location of the Rectangles bottom right corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottomRight", {
    
    get: function () {
        return new Phaser.Point(this.right, this.bottom);
    },

    set: function (value) {
        this.right = value.x;
        this.bottom = value.y;
    }

});

/**
* The x coordinate of the left of the Rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
* @name Phaser.Rectangle#left
* @property {number} left - The x coordinate of the left of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "left", {
   
    get: function () {
        return this.x;
    },

    set: function (value) {
        if (value >= this.right) {
            this.width = 0;
        } else {
            this.width = this.right - value;
        }
        this.x = value;
    }

});

/**
* The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
* @name Phaser.Rectangle#right
* @property {number} right - The sum of the x and width properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "right", {
       
    get: function () {
        return this.x + this.width;
    },

    set: function (value) {
        if (value <= this.x) {
            this.width = 0;
        } else {
            this.width = this.x + value;
        }
    }

});

/**
* The volume of the Rectangle derived from width * height.
* @name Phaser.Rectangle#volume
* @property {number} volume - The volume of the Rectangle derived from width * height.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "volume", {
    
    get: function () {
        return this.width * this.height;
    }

});

/**
* The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @name Phaser.Rectangle#perimeter
* @property {number} perimeter - The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "perimeter", {
    
    get: function () {
        return (this.width * 2) + (this.height * 2);
    }

});

/**
* The x coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerX
* @property {number} centerX - The x coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerX", {
    
    get: function () {
        return this.x + this.halfWidth;
    },

    set: function (value) {
        this.x = value - this.halfWidth;
    }

});

/**
* The y coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerY
* @property {number} centerY - The y coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerY", {
    
    get: function () {
        return this.y + this.halfHeight;
    },

    set: function (value) {
        this.y = value - this.halfHeight;
    }

});

/**
* The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
* However it does affect the height property, whereas changing the y value does not affect the height property.
* @name Phaser.Rectangle#top
* @property {number} top - The y coordinate of the top of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "top", {
    
    get: function () {
        return this.y;
    },

    set: function (value) {
        if (value >= this.bottom) {
            this.height = 0;
            this.y = value;
        } else {
            this.height = (this.bottom - value);
        }
    }

});

/**
* The location of the Rectangles top left corner as a Point object.
* @name Phaser.Rectangle#topLeft
* @property {Phaser.Point} topLeft - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "topLeft", {

    get: function () {
        return new Phaser.Point(this.x, this.y);
    },
    
    set: function (value) {
        this.x = value.x;
        this.y = value.y;
    }

});

/**
* Determines whether or not this Rectangle object is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
* If set to true then all of the Rectangle properties are set to 0. 
* @name Phaser.Rectangle#empty
* @property {boolean} empty - Gets or sets the Rectangles empty state.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "empty", {
    
    get: function () {
        return (!this.width || !this.height);
    },

    set: function (value) {
        this.setTo(0, 0, 0, 0);
    }

});

/**
* Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
* @method Phaser.Rectangle.inflate
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {number} dx - The amount to be added to the left side of the Rectangle.
* @param {number} dy - The amount to be added to the bottom side of the Rectangle.
* @return {Phaser.Rectangle} This Rectangle object.
*/
Phaser.Rectangle.inflate = function (a, dx, dy) {
    a.x -= dx;
    a.width += 2 * dx;
    a.y -= dy;
    a.height += 2 * dy;
    return a;
};

/**
* Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
* @method Phaser.Rectangle.inflatePoint
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} point - The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
* @return {Phaser.Rectangle} The Rectangle object.
*/
Phaser.Rectangle.inflatePoint = function (a, point) {
    return Phaser.Rectangle.inflate(a, point.x, point.y);
};

/**
* The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
* @method Phaser.Rectangle.size
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
* @return {Phaser.Point} The size of the Rectangle object
*/
Phaser.Rectangle.size = function (a, output) {
    if (typeof output === "undefined") { output = new Phaser.Point(); }
    return output.setTo(a.width, a.height);
};

/**
* Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
* @method Phaser.Rectangle.clone
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle}
*/
Phaser.Rectangle.clone = function (a, output) {
    if (typeof output === "undefined") { output = new Phaser.Rectangle(); }
    return output.setTo(a.x, a.y, a.width, a.height);
};

/**
* Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
* @method Phaser.Rectangle.contains
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {number} x - The x coordinate of the point to test.
* @param {number} y - The y coordinate of the point to test.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.contains = function (a, x, y) {
    return (x >= a.x && x <= a.right && y >= a.y && y <= a.bottom);
};

Phaser.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) {
    return (x >= rx && x <= (rx + rw) && y >= ry && y <= (ry + rh));
};

/**
* Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
* @method Phaser.Rectangle.containsPoint
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} point - The point object being checked. Can be Point or any object with .x and .y values.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsPoint = function (a, point) {
    return Phaser.Rectangle.contains(a, point.x, point.y);
};

/**
* Determines whether the first Rectangle object is fully contained within the second Rectangle object.
* A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
* @method Phaser.Rectangle.containsRect
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsRect = function (a, b) {

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    {
        return false;
    }

    return (a.x >= b.x && a.y >= b.y && a.right <= b.right && a.bottom <= b.bottom);

};

/**
* Determines whether the two Rectangles are equal.
* This method compares the x, y, width and height properties of each Rectangle.
* @method Phaser.Rectangle.equals
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
*/
Phaser.Rectangle.equals = function (a, b) {
    return (a.x == b.x && a.y == b.y && a.width == b.width && a.height == b.height);
};

/**
* If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
* @method Phaser.Rectangle.intersection
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @param {Phaser.Rectangle} [out] - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle} A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
*/
Phaser.Rectangle.intersection = function (a, b, out) {

    out  = out || new Phaser.Rectangle;

    if (Phaser.Rectangle.intersects(a, b))
    {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.width = Math.min(a.right, b.right) - out.x;
        out.height = Math.min(a.bottom, b.bottom) - out.y;
    }

    return out;

};

/**
* Determines whether the two Rectangles intersect with each other.
* This method checks the x, y, width, and height properties of the Rectangles.
* @method Phaser.Rectangle.intersects
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
*/
Phaser.Rectangle.intersects = function (a, b) {

    return (a.x < b.right && b.x < a.right && a.y < b.bottom && b.y < a.bottom);

    // return (a.x <= b.right && b.x <= a.right && a.y <= b.bottom && b.y <= a.bottom);

    // return (a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom);
    // return !(a.x > b.right + tolerance || a.right < b.x - tolerance || a.y > b.bottom + tolerance || a.bottom < b.y - tolerance);

};

/**
* Determines whether the object specified intersects (overlaps) with the given values.
* @method Phaser.Rectangle.intersectsRaw
* @param {number} left - Description.
* @param {number} right - Description.
* @param {number} top - Description.
* @param {number} bottom - Description.
* @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
* @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
*/
Phaser.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) {

    if (typeof tolerance === "undefined") { tolerance = 0; }

    return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

};

/**
* Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
* @method Phaser.Rectangle.union
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @param {Phaser.Rectangle} [out] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle} A Rectangle object that is the union of the two Rectangles.
*/
Phaser.Rectangle.union = function (a, b, out) {

    if (typeof out === "undefined") { out = new Phaser.Rectangle(); }

    return out.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));
    
};
