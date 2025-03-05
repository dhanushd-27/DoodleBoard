interface inputProps {
  className: string,
  placeholder: string
}

export default function input({ className, placeholder }: inputProps) {
  return (
      <input className={ className } placeholder={ placeholder } />
  )
}
