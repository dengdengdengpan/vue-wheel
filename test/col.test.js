import Vue from 'vue'
import WCol from '../src/components/WCol.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WCol ', () => {
  it('存在', () => {
    expect(WCol).to.exist
  })

  describe('props ', () => {
    const Constructor = Vue.extend(WCol)
    let vm, divElement
    beforeEach(() => {
      divElement = document.createElement('div')
      document.body.appendChild(divElement)
    })
    afterEach(() => {
      divElement.remove()
      vm.$destroy()
    })

    it('可以设置 span', () => {
      vm = new Constructor({
        propsData: {
          span: 12
        }
      }).$mount(divElement)
      expect(vm.$el.classList.contains('w-col-12')).to.be.true
      expect(getComputedStyle(vm.$el).flexBasis).to.equal('50%')
    })

    it('可以设置 offset', () => {
      vm = new Constructor({
        propsData: {
          offset: 4
        }
      }).$mount(divElement)
      expect(vm.$el.classList.contains('w-col-offset-4')).to.be.true
    })

    it('可以设置 order', () => {
      vm = new Constructor({
        propsData: {
          order: 5
        }
      }).$mount(divElement)
      expect(vm.$el.classList.contains('w-col-order-5')).to.be.true
      expect(getComputedStyle(vm.$el).order).to.equal('5')
    })

    it('可以设置 pull', () => {
      vm = new Constructor({
        propsData: {
          pull: 6
        }
      }).$mount(divElement)
      expect(vm.$el.classList.contains('w-col-pull-6')).to.be.true
    })

    it('可以设置 push', () => {
      vm = new Constructor({
        propsData: {
          push: 8
        }
      }).$mount(divElement)
      expect(vm.$el.classList.contains('w-col-push-8')).to.be.true
    })

    describe('可以设置响应式属性 ', () => {
      const responsiveList = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
      responsiveList.forEach(item => {
        it(`${item}，类型为 Number`, () => {
          vm = new Constructor({
            propsData: {
              [item]: 6
            }
          }).$mount(divElement)
          expect(vm.$el.classList.contains(`w-col-${item}-6`)).to.be.true
        })
      })

      responsiveList.forEach(item => {
        it(`${item}，类型为 Object`, () => {
          vm = new Constructor({
            propsData: {
              [item]: {
                span: 4, offset: 6, order: 2, pull: 3, push: 3
              }
            }
          }).$mount(divElement)
          expect(vm.$el.classList.contains(`w-col-${item}-4`)).to.be.true
          expect(vm.$el.classList.contains(`w-col-offset-${item}-6`)).to.be.true
          expect(vm.$el.classList.contains(`w-col-order-${item}-2`)).to.be.true
          expect(vm.$el.classList.contains(`w-col-pull-${item}-3`)).to.be.true
          expect(vm.$el.classList.contains(`w-col-push-${item}-3`)).to.be.true
        })
      })
    })
  })
})