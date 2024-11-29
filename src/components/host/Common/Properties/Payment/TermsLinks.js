import React, { useState } from "react";
import InputWithLabel from "../../Inputs/InputWithLabel";
import CommonButton from "../../Buttons/CommonButton";
import CloseSvg from "../../../utils/Images/CloseSvg";
import ErrorBlock from "../../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";

function TermsLinks({ data, handleTermLinks, setTermLinks }) {

    const [termLink, setTermLink] = useState({
        link: "",
    });

    const handleChange = (e) => {
        setTermLink({ ...termLink, [e.target.name]: e.target.value })
    }

    const [errorFieldsTermLinks, setErrorFieldsTermLinks] = useState({
        link: "",
    });


    const saveItem = () => {

        let isValid = true;
        let linkError = null;

        if (!termLink?.link.length)
            linkError = "Please enter link";

        if (linkError) {
            isValid = false;
        }

        setErrorFieldsTermLinks({
            ...errorFieldsTermLinks,
            link: linkError,
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        handleTermLinks(termLink);
        setTermLink({
            link: "",
        });
    }

    return (
        <>
            <div>
                <div className="border p-4 rounded relative">
                    <div className="flex gap-3">

                        <div className="w-1/3">
                            <InputWithLabel label={'Link'} value={termLink?.link} name={'link'} setValue={handleChange} />
                            {errorFieldsTermLinks?.link && <ErrorBlock>{errorFieldsTermLinks?.link}</ErrorBlock>}
                        </div>
                        <div className="mt-4">
                            <CommonButton className={`bg-primary-baseGray font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center `} onClick={() => saveItem(true)}>Save</CommonButton>
                        </div>
                    </div>

                    <CommonButton className={`bg-white font-Nunito text-primary-baseRed text-sm font-bold px-2 py-1  cursor-pointer rounded-lg border transition flex items-center gap-2 absolute top-2 right-2`} onClick={() => setTermLinks(false)}><CloseSvg width={12} height={12} className={'fill-primary-baseRed'} /><span>Close</span></CommonButton>
                </div>
            </div>

        </>

    )
}
export default TermsLinks;