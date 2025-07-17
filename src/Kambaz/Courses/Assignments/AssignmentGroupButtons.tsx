import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function AssignmentGroupButtons() {
    return (
        <div className="float-end">
            <div className="d-flex">
                <div className="rounded-pill px-1 py-1 bg-gray border border-black text-center me-2"
                    style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.4
                    }}>40% of Total</div>
                <GoPlus className="fs-4 mt-1" />
                <HiOutlineDotsVertical className="mt-1" />
            </div>
        </div>
    );
}