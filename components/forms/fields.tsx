import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink-faint " +
  "transition-colors focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {required && <span className="ml-0.5 text-ember-500" aria-hidden="true">*</span>}
    </label>
  );
}

function Help({ id, helper, error }: { id: string; helper?: string; error?: string }) {
  if (error)
    return (
      <p id={id} className="mt-1.5 text-sm font-medium text-ember-600" role="alert">
        {error}
      </p>
    );
  if (helper) return <p id={id} className="mt-1.5 text-sm text-ink-muted">{helper}</p>;
  return null;
}

type CommonProps = {
  label: string;
  name: string;
  helper?: string;
  error?: string;
  required?: boolean;
};

export function TextField({
  label, name, helper, error, required, className, ...rest
}: CommonProps & React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <input
        id={name}
        name={name}
        required={required}
        aria-describedby={`${name}-help`}
        aria-invalid={error ? true : undefined}
        className={cn(base, "h-12", error && "border-ember-500 focus:ring-ember-200")}
        {...rest}
      />
      <Help id={`${name}-help`} helper={helper} error={error} />
    </div>
  );
}

export function TextArea({
  label, name, helper, error, required, className, rows = 4, ...rest
}: CommonProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-describedby={`${name}-help`}
        aria-invalid={error ? true : undefined}
        className={cn(base, "py-3", error && "border-ember-500 focus:ring-ember-200")}
        {...rest}
      />
      <Help id={`${name}-help`} helper={helper} error={error} />
    </div>
  );
}

export function SelectField({
  label, name, helper, error, required, className, children, ...rest
}: CommonProps & React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <select
        id={name}
        name={name}
        required={required}
        aria-describedby={`${name}-help`}
        className={cn(base, "h-12 appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10", error && "border-ember-500")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236B665C' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {children}
      </select>
      <Help id={`${name}-help`} helper={helper} error={error} />
    </div>
  );
}

export function Checkbox({
  label, name, error, ...rest
}: { label: React.ReactNode; name: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-line text-gold-500 focus:ring-gold-300"
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && <p className="mt-1.5 text-sm font-medium text-ember-600" role="alert">{error}</p>}
    </div>
  );
}
