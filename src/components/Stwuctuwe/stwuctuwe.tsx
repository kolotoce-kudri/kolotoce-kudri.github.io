export default function Stwuctuwe() {
    const dir = `.github/
        dependabot.yml
        workflows/
                  buildndeploy.yml

public/
       index.html
       main.js
       preload.js

src/
    App.js
    index.tsx
    input.css
    components/
               Hewwo/
                     hewwo.tsx

               Tutowial/
                        tutowial.tsx
                        
               Stwucture/
                         stwucture.tsx`
    return (
        <pre dangerouslySetInnerHTML={{__html: dir}} id='structure' className='border w-max col-[1] row-[2] m-0 px-16 py-6 rounded-2xl border-[solid] whitespace-pre text-xs font-mono leading-4' style={{lineBreak: "anywhere"}}/>
    )
}