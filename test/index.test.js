import { transform } from "@babel/core"
import plugin from '../src/index'

describe('index', () => {
    

    it(`should add importDeclaration`, () => {
        const code1 = `
            function Bar() {
                const onClick=() => {}
                return (
                    <div onClick={_.debounce(() => onClick(), 100)}> aaaa </div>
                )
            }
        `
        const code2 = `
            import _ from 'lodash'
            function Bar() {
                const onClick=() => {}
                return (
                    <>
                    <div onClick={_.debounce(() => onClick(), 100)}> aaaa </div>
                    <div onClick={_.debounce(() => onClick(), 100)}> bbbb </div>
                    </>
                )
            }
        `
        const rs1 = transform(code1, {
            presets: ['@babel/preset-react'],
            plugins: [[plugin, { specific: '_', lib: 'lodash' }]]
        }).code

        const rs2 = transform(code2, {
            presets: ['@babel/preset-react'],
            plugins: [[plugin, { specific: '_', lib: 'lodash' }]]
        }).code
        
        // console.log(rs1)
        console.log(rs2)
    })
})