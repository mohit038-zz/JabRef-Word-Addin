import {
  ITheme,
  getTheme,
  List,
  mergeStyleSets,
  getFocusStyle,
  FocusZone,
  FocusZoneDirection,
  Checkbox,
} from "@fluentui/react";
import React from "react";

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

interface ReferenceListProps {
  list: Array<{}>;
  onCheckBoxChange: any;
}
const classNames = mergeStyleSets({
  container: {
    overflow: "auto",
    height: "80vh",
    padding: "0.25rem 0.25rem 0px",
    boxSizing: "border-box",
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      backgroundColor: theme.palette.neutralLighterAlt,
      minHeight: 54,
      padding: "0.25rem",
      margin: 2,
      boxSizing: "border-box",
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: "flex",
      selectors: {
        "&:hover": { background: palette.themeLighterAlt },
      },
    },
  ],
  itemContent: {
    marginLeft: 10,
    boxSizing: "border-box",
    overflow: "auto",
    flexGrow: 1,
  },
  itemTitle: [
    fonts.mediumPlus,
    {
      whiteSpace: "nowrap",
      position: "relative",
      maxHeight: "5.4em",
      lineHeight: "1.8em",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  ],
  itemAuthor: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  itemYear: {
    fontSize: fonts.smallPlus,
    color: palette.neutralTertiary,
  },
  itemType: {
    fontSize: fonts.smallPlus,
    color: palette.neutralTertiary,
  },
  checkbox: {
    marginTop: 6,
    marginLeft: 4,
  },
});

function ReferenceList(props: ReferenceListProps) {
  const onRenderCell = (item): JSX.Element => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Checkbox
          className={classNames.checkbox}
          title={item.title}
          checked={!!item.isChecked}
          onChange={props.onCheckBoxChange}
        />
        <div className={classNames.itemContent}>
          <div className={classNames.itemType}>{item.type}</div>
          <div className={classNames.itemTitle}>{item.title}</div>
          <div className={classNames.itemAuthor}>{item.author}</div>
          <div className={classNames.itemYear}>
            {item.journal} {item.year}
          </div>
        </div>
      </div>
    );
  };

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div className={classNames.container} data-is-scrollable>
        <List items={props.list} onRenderCell={onRenderCell} />
      </div>
    </FocusZone>
  );
}

export default ReferenceList;