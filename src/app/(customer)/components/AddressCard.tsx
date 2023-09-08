import { Button } from "@nextui-org/button";

type Props = {
    icon: JSX.Element
}

export default function AddressCard({ icon }: Props) {
    return (
        <Button className="h-fit py-2 px-5 w-full justify-between" variant="light" endContent={icon}>
            <div className="flex flex-col items-start gap-0">
                <div className="flex gap-1 items-center">
                    <h4 className="text-base font-bold">Hilmi</h4>
                    <p className="text-sm tracking-wide">(6285876879010)</p>
                </div>
                <p className="text-sm">jl. blbladfadfasdf</p>
                <span className="font-bold text-xs flex gap-2">note: <p className="font-normal">samping pasar</p></span>
            </div>
        </Button>
    )
}
