
export default function Breadcrumb({ title, subtitle }) {
    return (
        <div className="pb-7">
            <div className="font-Nunito text-black text-lg font-bold">{title}</div>
            <div className="font-Nunito text-primary-textGray text-base font-medium">{subtitle}</div>
        </div>
    )
}