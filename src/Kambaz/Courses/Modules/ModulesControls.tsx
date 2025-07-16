import { FaPlus } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";  
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>

            <Dropdown className="float-end me-2">
                <Dropdown.Toggle variant="secondary" size="lg">
                    <GreenCheckmark />
                    Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <GreenCheckmark />
                        Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <GreenCheckmark />
                        Publish modules only
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        <RxCrossCircled className="me-2 text-danger" />
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        <RxCrossCircled className="me-2 text-danger" />
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button
                variant="secondary"
                size="lg"
                className="float-end me-2"
                id="wd-view-progress"
            >
                View Progress
            </Button>

            <Button
                variant="secondary"
                size="lg"
                className="float-end me-2"
                id="wd-collapse-all"
            >
                Collapse All
            </Button>
        </div>
    );
}
