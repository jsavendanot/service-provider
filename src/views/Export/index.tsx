import React, { useState, useRef } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Button } from 'common/components';
import { Document, Toolbar, Filter } from './components';
import { ExportFilterType } from 'types/export';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 80px'
  },
  menuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  content: {
    marginTop: '20px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    color: '#FFFFFF'
  }
}));

export type Export = {
  goal: boolean;
  journey: boolean;
  story: boolean;
  safety: boolean;
  network: boolean;
};

export type ExportKeys = keyof Export;

export const Export: React.FC = () => {
  const classes = useStyles();

  const printDivRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(0);

  const loading: boolean = useSelector(
    (state: RootState) => state.export.loading
  );

  const [checks, setChecks] = useState<Export>({
    goal: false,
    journey: false,
    story: false,
    safety: false,
    network: false
  });

  const [filters, setFilters] = useState<ExportFilterType>({
    goal: '',
    story: false,
    journey: false,
    safety: false,
    network: ''
  });

  const handleSwitchChange = (name: ExportKeys, value: boolean) => {
    setChecks(values => ({
      ...values,
      [name]: value
    }));

    if (value) {
      setButtonDisable(value => value + 1);
    } else {
      setButtonDisable(value => value - 1);
    }
  };

  const saveDocEvent = () => {
    const printDivDomNode = printDivRef.current;
    if (printDivDomNode) {
      html2canvas(printDivDomNode).then((canvas: HTMLCanvasElement) => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 10; // give some top padding to first page

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position += heightLeft - imgHeight; // top padding for other pages
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('myplan.pdf');
      });
    }
  };

  const emailDocEvent = () => {
    window.location.href = `mailto:${sessionStorage.getItem(
      'UserEmail'
    )}?subject=Jiemba Report`;
  };

  const handleGenerateButtonClick = () => {
    setPreview(true);
    // dispatch(downloadGenerateData(filters));
  };

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <div style={{ marginTop: '37px' }}>
          <span className={classes.menuText}>Export & Share</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <div>
              <Filter
                checks={checks}
                setChecks={handleSwitchChange}
                setFilters={setFilters}
              />
            </div>
            <div
              style={{
                width: '260px',
                marginTop: '30px'
              }}>
              <Button
                type="primary"
                click={handleGenerateButtonClick}
                disabled={buttonDisable === 0}>
                <span className={classes.buttonText}>Generate document</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={7}>
            <Document />
          </Grid>
          <Grid item xs={1}>
            <Toolbar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Export;
