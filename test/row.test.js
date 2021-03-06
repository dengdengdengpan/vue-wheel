// noinspection DuplicatedCode

import Vue from 'vue'
import WRow from '../src/components/WRow.vue'
import WCol from '../src/components/WCol.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WRow ', function() {
  it('存在', () => {
    expect(WRow).to.be.exist
  })

  describe('props ', function() {
    const Constructor = Vue.extend(WRow)
    let vm, divElement
    beforeEach(function() {
      divElement = document.createElement('div')
      document.body.appendChild(divElement)
    })
    afterEach(function() {
      divElement.remove()
      vm.$destroy()
    })

    it('可以设置 gutter', function() {
      Vue.component('w-row', WRow)
      Vue.component('w-col', WCol)
      divElement.innerHTML = `
        <w-row :gutter="20">
          <w-col>111</w-col>
          <w-col>222</w-col>
        </w-row>
      `
      vm = new Vue({
        el: divElement
      })
      const row = vm.$el.querySelector('.w-row')
      const cols = vm.$el.querySelectorAll('.w-col')
      expect(getComputedStyle(row).marginLeft).to.equal('-10px')
      expect(getComputedStyle(row).marginRight).to.equal('-10px')
      expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')
      expect(getComputedStyle(cols[1]).paddingLeft).to.equal('10px')
    })

    describe('可以设置 justify ', function() {
      const justifyProps = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']
      const justifyContentList = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
      justifyProps.forEach((item, index) => {
        it(`值为 ${item}`, function() {
          vm = new Constructor({
            propsData: {
              justify: item
            }
          }).$mount(divElement)
          expect(vm.$el.classList.contains(`w-row-${item}`)).to.be.true
          expect(getComputedStyle(vm.$el).justifyContent).to.equal(justifyContentList[index])
        })
      })
    })

    describe('可以设置 align ', function() {
      const alignProps = ['top', 'middle', 'bottom']
      const alignItemsList = ['flex-start', 'center', 'flex-end']
      alignProps.forEach((item, index) => {
        it(`值为 ${item}`, function() {
          vm = new Constructor({
            propsData: {
              align: item
            }
          }).$mount(divElement)
          expect(vm.$el.classList.contains(`w-row-${item}`)).to.be.true
          expect(getComputedStyle(vm.$el).alignItems).to.equal(alignItemsList[index])
        })
      })
    })

    describe('可以设置 wrap ', function() {
      it('值为 true', function() {
        vm = new Constructor().$mount(divElement)
        expect(getComputedStyle(vm.$el).flexWrap).to.equal('wrap')
      })

      it('值为 false', function() {
        vm = new Constructor({
          propsData: {
            wrap: false
          }
        }).$mount(divElement)
        expect(vm.$el.classList.contains('w-row-no-wrap')).to.be.true
        expect(getComputedStyle(vm.$el).flexWrap).to.equal('nowrap')
      })
    })
  })
})
