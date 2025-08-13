import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { FormControl, ListGroup } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as moduleClient from "./client";
import * as courseClient from "../client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  
  console.log("Modules component - cid:", cid);
  console.log("Modules component - modules:", modules);
  console.log("Modules component - currentUser:", currentUser);

  const addModuleHandler = async () => {
    const newModule = await courseClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      try {
        console.log("Fetching modules for course:", cid);
        const modules = await courseClient.findModulesForCourse(cid);
        console.log("Fetched modules:", modules);
        dispatch(setModules(modules));
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    if (cid) {
      fetchModules();
    }
  }, [cid, dispatch]);

  const deleteModuleHandler = async (moduleId: string) => {
    await moduleClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const updateModuleHandler = async (module: any) => {
    await moduleClient.updateModule(module);
    dispatch(updateModule(module));
  };
 
  return (
    <div>
      {/* Always render controls, but only show Add button if isFaculty */}
      <ModulesControls
        addModule={addModuleHandler}
        setModuleName={setModuleName}
        moduleName={moduleName}
        isFaculty={isFaculty}
      />
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl className="w-50 d-inline-block"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateModuleHandler({ ...module, name: e.target.value })}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      updateModuleHandler({ ...module, editing: false });
                    }
                  }}
                  value={module.name} />
              )}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1" key={lesson._id}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    {isFaculty && <LessonControlButtons />}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
