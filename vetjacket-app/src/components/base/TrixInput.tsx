import { ChangeEvent, Fragment } from "react";
import "./styles/trix.css";
// @ts-ignore
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";

interface TrixInputProps {
    onValueChange: (value: string) => void;
    onAddAttachment: (value: string) => void;
    onRemoveAttachment: (value: string) => void;
}

export default function TrixInput({
    onValueChange,
    onAddAttachment,
    onRemoveAttachment,
}: TrixInputProps) {
    return (
        <Fragment>
            <ReactTrixRTEToolbar toolbarId="react-trix-rte-editor" />
            <ReactTrixRTEInput
                toolbarId="react-trix-rte-editor"
                defaultValue=""
                onChange={(event: ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
                onAttachmentAdd={(event: any) => onAddAttachment(event.attachment)}
                onAttachmentRemove={(event: any) =>
                    onRemoveAttachment(event.attachment)
                }
            />
        </Fragment>
    );
}
