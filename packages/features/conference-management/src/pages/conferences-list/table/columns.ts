enum ColumnKey {
  Id = 'id',
  Title = 'title',
  Acronym = 'acronym',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Location = 'location',
  ParticipantsCount = 'participantsCount',
  RegistrationDeadline = 'registrationDeadline',
  Actions = 'actions',
}

interface Column {
  key: ColumnKey;
  label: string;
  sortable: boolean;
}

const columns: Column[] = [
  { key: ColumnKey.Id, label: 'ID', sortable: true,  },
  { key: ColumnKey.Title, label: 'Title', sortable: true,  },
  { key:ColumnKey.Acronym, label: 'Acronym', sortable: true,  },
  { key:ColumnKey.StartDate, label: 'Start Date', sortable: true ,},
  { key:ColumnKey.EndDate, label: 'End Date', sortable: true ,},
  { key:ColumnKey.Location, label: 'Location', sortable: true ,},
  { key:ColumnKey.ParticipantsCount, label: 'Participants Count', sortable: false, },
  { key:ColumnKey.RegistrationDeadline, label: 'Registration Deadline', sortable: true,  },
  { key:ColumnKey.Actions, label: 'Actions', sortable: false ,},
];

export { ColumnKey, columns, type Column };

