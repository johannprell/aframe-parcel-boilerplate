import * as AFRAME from 'aframe'
import randomInt from 'random-int'

export function init () {
  helloWorldComponent()
  rotatorComponent()
  colorJumpComponent()
}

function helloWorldComponent () {
  AFRAME.registerComponent('hello-world', {
    init: function () {
      console.log('hello world from component!')
    }
  })
}

function rotatorComponent () {
  AFRAME.registerComponent('rotator', {
    schema: {
      speed: { type: 'number', default: 0.01 }
    },
    init: function () {
      console.log(`Entity ${this.el.nodeName} set to rotate with speed ${this.data.speed}`)
    },
    tick: function (time, timeDelta) {
      const m = this.el.object3D
      const speed = this.data.speed
      m.rotation.x += speed
      m.rotation.y += speed
      m.rotation.z += speed
    }
  })
}

function colorJumpComponent () {
  AFRAME.registerComponent('color-jump', {
    schema: {
      frameInterval: { type: 'number', default: 30 },
      colors: {
        type: 'array',
        default: [
          { r: 1, g: 0, b: 1 },
          { r: 1, g: 1, b: 0 },
          { r: 0, g: 1, b: 1 },
          { r: 1, g: 0, b: 0 },
          { r: 0, g: 1, b: 0 },
          { r: 0, g: 0, b: 1 }
        ]
      }
    },
    init: function () {
      console.log(`Entity ${this.el.nodeName} set to jump between colors ${this.data.colors} on every ${this.data.frameInterval}th frame`)
      this.frame = 0
    },
    tick: function (time, timeDelta) {
      if (++this.frame % this.data.frameInterval !== 0) return
      const m = this.el.getObject3D('mesh')
      m.material.color = this.data.colors[randomInt(0, this.data.colors.length)]
    }
  })
}
