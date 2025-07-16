import BackgroundColors from "./BackgroundColors";
import Boaders from "./Borders";
import Corners from "./Corners";
import { Container }from "react-bootstrap";
import Dimensions from "./Dimensions";
import ForegroundColors from "./ForegroundColors";
import GridLayout from "./GridLayout";
import Padding from "./Padding";
import Positions from "./Positions";
import Margins from "./Margins";
import Float from "./Float";
import Flex from "./Flex";
import Zindex from "./Zindex";
import "./index.css";
import BootstrapGrids from "./BootstrapGrids";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";
import ReactIcons from "./ReactIcons";

export default function Lab2() {
    return (
        <Container>
            <div className="container">
                <h2>Lab 2 - Cascading Style Sheets</h2>
                <BootstrapNavigation />
                <BootstrapForms />
                <BootstrapLists />
                <BootstrapTables />
                <BootstrapGrids />
                <Positions />
                <hr />
                <Flex />
                <hr />
                <ReactIcons />
                <hr />
                <GridLayout />
                <hr />
                <Float />
                <hr />
                <Positions />
                <hr />
                <Zindex />
                <hr />
                <Dimensions />
                <hr />
                <Boaders />
                <hr />
                <BackgroundColors />
                <hr />
                <ForegroundColors />
                <hr />
                <Padding />
                <hr />
                <Margins />
                <hr />
                <Corners />
                <hr />
                <h3>Styling with the STYLE attribute</h3>
                <p id="wd-lab2-style-attribute">
                    Style attribute allows configuring look and feel
                    right on the element. Although it's very convenient
                    it is considered bad practice and you should avoid
                    using the style attribute
                </p>
                </div>
        </Container>
    );
}

