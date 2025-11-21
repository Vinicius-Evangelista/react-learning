import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useChecked } from './useChecked';

type Props<Data> = {
  data: Data[];
  id: keyof Data;
  primary: keyof Data;
  secondary: keyof Data;
  renderItem?: (item: Data) => ReactNode;
} & ComponentPropsWithoutRef<'ul'>;  

export function Checklist<Data>({
  data,
  id,
  primary,
  secondary,
  renderItem,
  ...ulProps
}: Props<Data>) {
  const { checkedIds, handleCheckChange } = useChecked();

  return (
    <ul {...ulProps}>
      {data.map((item) => {
        if (renderItem) {
          return renderItem(item);
        }
        const idRaw = item[id] as unknown;
        if (typeof idRaw !== 'string' && typeof idRaw !== 'number') {
          return null;
        }
        const idValue = idRaw as string | number;
        const primaryText = item[primary] as unknown;
        if (typeof primaryText !== 'string') {
          return null;
        }
        const secondaryText = item[secondary] as unknown;
        return (
          <li key={idValue}>
            <label>
              <input
                type="checkbox"
                checked={checkedIds.includes(idValue)}
                onChange={handleCheckChange(idValue)}
              />
              <div>
                <div className="primary">
                  {primaryText as string}
                </div>
                {typeof secondaryText === 'string' && (
                  <div className="secondary">
                    {secondaryText}
                  </div>
                )}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
