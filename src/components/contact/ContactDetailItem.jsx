import IconBox from "@/components/ui/IconBox";
import {
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/ui/Icons";

const icons = {
  map: IconMapPin,
  mail: IconMail,
  phone: IconPhone,
};

export default function ContactDetailItem({ item }) {
  const Icon = icons[item.icon] || IconMapPin;
  const body = item.href ? (
    <a
      href={item.href}
      className="font-body text-sm text-neutral-gray transition duration-300 hover:text-navy"
    >
      {item.body}
    </a>
  ) : (
    <p className="font-body text-sm text-neutral-gray">{item.body}</p>
  );

  return (
    <li className="flex items-start gap-4">
      <IconBox>
        <Icon className="h-5 w-5" />
      </IconBox>
      <div>
        <p className="font-display text-sm font-semibold text-navy">
          {item.title}
        </p>
        <div className="mt-1">{body}</div>
      </div>
    </li>
  );
}
