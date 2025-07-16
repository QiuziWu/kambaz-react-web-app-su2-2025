export default function Float() {
    return (
        <div id="wd-float-divs">
            <h2>Float</h2>
            <div>
                <img className="wd-float-right"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <img className="wd-float-left"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced 
                in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                <img className="wd-float-right"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                It is a long established fact that a reader will be distracted by the readable content of a page when 
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many 
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a 
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved 
                over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                <img className="wd-float-left"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum."
                <div className="wd-float-done"></div>
            </div>
            < br/>
            < br/>
            <div>
                <div className="wd-float-left wd-dimension-portrait
                   wd-bg-color-yellow">
                    Yellow </div>
                <div className="wd-float-left wd-dimension-portrait
                   wd-bg-color-blue wd-fg-color-white">
                    Blue </div>
                <div className="wd-float-left wd-dimension-portrait
                   wd-bg-color-red">
                    Red </div>
                <img className="wd-float-right"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                <div className="wd-float-done"></div>
            </div>

        </div>
    );
}