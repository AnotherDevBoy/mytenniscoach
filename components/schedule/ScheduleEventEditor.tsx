import { useEffect, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  createFilterOptions
} from '@mui/material';
import type {
  ProcessedEvent,
  SchedulerHelpers
} from '@aldabil/react-scheduler/types';
import { toProcessedEvent } from '@/lib/convert';
import {
  EventDTO,
  getEventTypeFromIndex,
  getEventTypeIndex
} from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { createOpponent, createEvent, updateEvent } from '@/lib/api';
import Grid from '@mui/material/Unstable_Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  AutocompleteElement,
  DateTimePickerElement,
  FormContainer,
  SelectElement,
  useForm,
  useWatch
} from 'react-hook-form-mui';
import { EventType } from '@/lib/types';
import React from 'react';
interface SelectedOpponent {
  inputValue?: string;
  title: string;
  id?: string;
}

interface OpponentDTO {
  id: string;
  name: string;
}

const filter = createFilterOptions<SelectedOpponent>();

interface ScheduleEventEditorProps {
  scheduler: SchedulerHelpers;
  opponents: OpponentDTO[];
  onComplete: Function;
}

const ScheduleEventEditor = ({
  scheduler,
  opponents,
  onComplete
}: ScheduleEventEditorProps) => {
  const event: ProcessedEvent | undefined = scheduler.edited;

  const opponentName =
    opponents.find((o) => o.id === event?.opponent)?.name || '';

  const defaultOpponent = {
    id: event?.opponent,
    title: opponentName,
    inputValue: opponentName
  };

  const formContext = useForm<any>({
    defaultValues: {
      type: getEventTypeIndex(event?.type || EventType.Match),
      start: event?.start || scheduler.state.start.value,
      end: event?.end || scheduler.state.end.value,
      opponent: defaultOpponent
    }
  });

  const { handleSubmit, control } = formContext;

  const [type] = useWatch({
    control: control,
    name: ['type']
  });

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(async (data) => {
        try {
          scheduler.loading(true);

          let opponentId = data.opponent.id;

          if (
            getEventTypeFromIndex(data.type) === EventType.Match &&
            !opponentId
          ) {
            const opponent = await createOpponent(data.opponent.inputValue);
            opponentId = opponent.id;
          }

          const scheduleEvent: EventDTO = {
            id: String(event ? event.event_id : uuidv4()),
            start: data.start.toISOString(),
            end: data.end.toISOString(),
            type: Object.values(EventType)[data.type],
            opponentId: opponentId
          };

          const response =
            event != undefined
              ? await updateEvent(scheduleEvent)
              : await createEvent(scheduleEvent);

          const added_updated_event = toProcessedEvent(
            scheduleEvent,
            opponents
          );

          scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
          onComplete();
          scheduler.close();
        } finally {
          scheduler.loading(false);
        }
      })}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2} margin={2}>
          <Grid xs={6}>
            <DateTimePickerElement
              label="Start"
              name="start"
              required
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid xs={6}>
            <DateTimePickerElement
              label="End"
              name="end"
              required
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid xs={12}>
            <SelectElement
              label="Type"
              name="type"
              options={Object.keys(EventType).map((v, i) => {
                return { id: i, label: v };
              })}
              required
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            {type === 0 ? (
              <AutocompleteElement
                name="opponent"
                label="Opponent"
                options={opponents.map((o: OpponentDTO) => {
                  return { id: o.id, title: o.name };
                })}
                autocompleteProps={{
                  freeSolo: true,
                  filterOptions: (options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;

                    const isExisting = options.some(
                      (option) => inputValue === option.title
                    );

                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue: inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  },
                  getOptionLabel: (option) => {
                    if (typeof option === 'string') {
                      return option;
                    }

                    if (option.id) {
                      return opponents.find((o) => o.id === option.id)?.name;
                    }

                    if (option.inputValue) {
                      return option.inputValue;
                    }

                    return option.title;
                  },
                  renderOption: (props, option) => {
                    return <li {...props}>{option.title}</li>;
                  },
                  selectOnFocus: true,
                  clearOnBlur: true,
                  handleHomeEndKeys: true
                }}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid xs={12}>
            <DialogActions>
              <Button
                variant="contained"
                onClick={scheduler.close}
                color="secondary"
              >
                CANCEL
              </Button>
              <Button type={'submit'} variant="contained" color="success">
                CONFIRM
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </FormContainer>
  );
};

export default ScheduleEventEditor;
