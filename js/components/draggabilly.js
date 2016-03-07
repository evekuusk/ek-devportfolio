// =============================== DRAGGABILLY =============================== //
var $draggable
function setDraggable() {
  $draggable = $('.draggable').draggabilly({
    containment: $(this).parent('.drag-drop-box')
    // grid: [25, 25]
  })
  $draggable.on('dragMove', dragListener);
  $draggable.on('dragEnd', dropListener);
}

Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

// function...get width and height of droppable area in this question
var dropWidth
var dropHeight
function getDroppableDimensions() {
  dropWidth = $(droppables).width()
  dropHeight = $(droppables).height()
}
var dropped
var droppedTimes = 0
function calculateDropRange(draggie, top, left) {
  var droppedArea = false
  getDroppableDimensions()
  for (i = 0; i < dropsOffset.length; i ++) {
    $(droppables).removeClass('dropped-hover')
    var currentTop = dropsOffset[i].top
    var currentLeft = dropsOffset[i].left
    if (((top.between(currentTop, currentTop + dropHeight)) || (top.between(currentTop, currentTop - (dropHeight / 2)))) && ((left.between(currentLeft, currentLeft + dropWidth)) || (left.between(currentLeft, currentLeft - (dropWidth / 2))))) {
      dropped = drops[i]
      draggedBox = draggie.element.id
      droppedArea = true
      break
    } else {
      // do something
    }
  }
  // move dropped item back to its starting position
  if (droppedArea == false) {
    var newY = '-=' + (draggie.position.y) + 'px'
    var newX = '-=' + (draggie.position.x) + 'px'
    $(document.getElementById(draggie.element.id)).animate({
      top: newY,
      left: newX
    }, 200);
  } else {
    // change appearance of dropped area and hide dropped element.
    droppedTimes = droppedTimes + 1
    droppedAnswers.push([draggedBox, dropped])
    var affectedDraggedItem = document.getElementById(draggedBox)
    var affectedDropZone = document.getElementById(dropped)
    $(affectedDropZone).addClass('dropped-full').text($(affectedDraggedItem).text());
    $(affectedDraggedItem).css('display', 'none');
    if (droppedTimes == drops.length) {
      $(affectedDraggedItem).siblings('.qSubmit').removeClass('pure-button-disabled')
    } else {
      // do something
    }
  }
}

function calculateDragRange(draggie, top, left) {
  getDroppableDimensions()
  for (i = 0; i < dropsOffset.length; i ++) {
    var currentTop = dropsOffset[i].top
    var currentLeft = dropsOffset[i].left
    if (((top.between(currentTop, currentTop + dropHeight)) || (top.between(currentTop, currentTop - (dropHeight / 2)))) && ((left.between(currentLeft, currentLeft + dropWidth)) || (left.between(currentLeft, currentLeft - (dropWidth / 2))))) {
      droppableSpot = drops[i]
      $(document.getElementById(droppableSpot)).addClass('dropped-hover')
      break
    } else {
      $(droppables).removeClass('dropped-hover')
    }
  }
}

var droppedAnswers = []
var dropsOffset = []
var drops = []
var droppables

function dragListener() {
  var draggie = $(this).data('draggabilly');
  var dragx = (draggie.pointerDownPoint.x) + (draggie.dragPoint.x)
  var dragy = (draggie.pointerDownPoint.y) + (draggie.dragPoint.y)
  var dragPosition = $(this).position()
  drops = []
  droppables = $(this).parent().find('.droppable')
  for (i = 0; i < droppables.length; i ++) {
    var id = $(droppables[i]).attr('id')
    drops.push(id)
  }
  dropsOffset = []
  for (i = 0; i < drops.length; i ++) {
    var offset = $(document.getElementById(drops[i])).position();
    dropsOffset.push(offset)
  }
  calculateDragRange(draggie, dragPosition.top, dragPosition.left);
}

function dropListener() {
  var draggie = $(this).data('draggabilly');
  var dropx = draggie.pointerDownPoint.x
  var dropy = draggie.pointerDownPoint.y
  var dropPosition = $(this).position()
  drops = []
  droppables = $(this).parent().find('.droppable')
  for (i = 0; i < droppables.length; i ++) {
    var id = $(droppables[i]).attr('id')
    drops.push(id)
  }
  dropsOffset = []
  for (i = 0; i < drops.length; i ++) {
    var offset = $(document.getElementById(drops[i])).position();
    dropsOffset.push(offset)
  }
  // if dropPosition is within a range of any item in dropsOffset, check which drop area is under the cursor...
  calculateDropRange(draggie, dropPosition.top, dropPosition.left);
}
