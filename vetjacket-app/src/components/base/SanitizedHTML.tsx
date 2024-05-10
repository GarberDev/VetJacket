import sanitizeHtml from "sanitize-html";

interface SanitizedHTMLProps {
    html: string;
    options?: any;
}

export default function SanitizedHTML({ html, options }: SanitizedHTMLProps) {
    const defaultOptions = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedIframeHostnames: [],
    };

    const sanitize = (dirty: any, options: any) => ({
        __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
    });
    return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}
