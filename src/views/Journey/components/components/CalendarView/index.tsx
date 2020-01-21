/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useRef } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  colors,
  useTheme,
  useMediaQuery,
  Theme
} from '@material-ui/core';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import Toolbar from './Toolbar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-widget-header': {
      backgroundColor: colors.grey[50]
    },
    '& .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-list-item-time': {
      ...theme.typography.body2
    },
    '& .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-list-heading-main': {
      ...theme.typography.h6
    },
    '& .fc-list-heading-alt': {
      ...theme.typography.h6
    },
    '& .fc th': {
      borderColor: theme.palette.divider
    },
    '& .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: 500,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: colors.grey[50]
    },
    '& .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-highlight': {
      backgroundColor: colors.blueGrey[50]
    },
    '& .fc-event': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit'
      }
    },
    '& .fc-list-empty': {
      ...theme.typography.subtitle1
    }
  },
  card: {
    paddingTop: '15px'
  },
  journalText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B3B3B3'
  }
}));

const CalendarView: React.FC = () => {
  const classes = useStyles();
  const calendarRef = useRef<any>(null);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [view] = useState(mobileDevice ? 'listWeek' : 'dayGridMonth');
  const [date, setDate] = useState<Date>(moment().toDate());
  const [events] = useState<any>([]);
  const [, setEventModal] = useState({
    open: false,
    event: null
  });

  const handleEventClick = (info: any): boolean | void => {
    const selected = events.find((event: any) => event.id === info.event.id);

    setEventModal({
      open: true,
      event: selected
    });
  };

  const handleDatePrev = () => {
    if (calendarRef && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    if (calendarRef && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Card className={classes.card}>
          <Toolbar
            date={date}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
          />
          <CardContent>
            <FullCalendar
              allDayMaintainDuration
              defaultDate={date}
              defaultView={view}
              droppable
              editable
              eventClick={handleEventClick}
              eventResizableFromStart
              events={events}
              header={false}
              height={500}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                timelinePlugin
              ]}
              ref={calendarRef}
              rerenderDelay={10}
              selectable
              weekends
            />
          </CardContent>
        </Card>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '30px 0'
        }}>
        <span className={classes.journalText}>
          {moment(date).format('DD MMMM YYYY')}
        </span>
        <div
          style={{
            width: '100%',
            border: '1px solid #B3B3B3',
            margin: '10px 0'
          }}
        />
        <div
          style={{
            width: '100%',
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <span className={classes.journalText}>
            There’s no journal on this day.
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default CalendarView;
