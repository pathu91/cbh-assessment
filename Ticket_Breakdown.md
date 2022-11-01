# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

<!-- 1. Relational
  Facilities (id)
    Shifts (times, agentID)
      Agent metadata (dbID, customID, hours, etc.)

fn getShiftsByFacility(facilityID) => shifts - all shifts worked that quarter + agent ID

fn generateReport(shifts, dbID?, customID?) => PDF -->

## Database Table Alteration - Agents

**Summary:**

Our team would like to allow facilities the ability to create custom IDs for their agents and generate reports based on those IDs.

**Current workflow:**

Generate shifts based on Facility ID - Generates all shift IDs worked in that quarter which contains the hours in that shift along with agent metadata(dbID, name, etc).

Generate report based on agent ID - Generates a PDF with breakdown of all shifts worked that quarter along with agents who have worked those shifts - by agent unique dbID.

**Enhancement:**

We want to alter our Agent table to include a new column for customID.

customID will be user-populated and it will allow facility managers to create custom identification for their agents.

- customID data type should be INT
- customID should be unique
- customID should be optional

**Acceptance Criteria**

- customID addition should not have any side-effects on current getShiftsByFacility or generateReport functions.
- customID should not mutate entries in Agents table

**Estimated**

2 hours

## Refactor generateReport functionality

**Summary:**

Our team would like to allow facilities the ability to create custom IDs for their agents and generate reports based on those IDs.

**Current workflow:**

generateReport takes the list of all shift IDs and generates a report with all Agents that have worked those shifts using database ID(dbID) as an identifier and including Agent metadata such as name, hours, etc.

Agents metadata is pulled from the Agents table by dbID which is the unique key for each agent.

**Enhancement:**

We are implementing a feature that will allow Facilities to create custom IDs for Agents (customID) that will replace the Agent's dbID in these reports IF they have a customID.

We will be altering the Agents table to include a new column, customID, which will be included when generating the report.

Refactor code to include conditional check to see if customID exists, if it does we want to replace the dbID displayed on the reports to customID. If not, leave dbID displayed.

Where dbID is used as a parameter, customID should be implemented in a way where if customID is not provided, dbID is used instead.

**Acceptance Criteria**

- if customID exists for Agent, report should display customID
- if customID does not exist for Agent, report should display dbID
- customID parameters should be optional so code properly executes without providing customID

**Estimated**

20 hours

## Refactor create Agent function

**Summary:**

Our team would like to allow facilities the ability to create custom IDs for their agents and generate reports based on those IDs.

**Current workflow:**

Our create agent functionality currently allows facility managers to input Agent metadata including - name, location, license ID, etc. This creates a new entry in our Agents table.

**Enhancement:**

We are implementing a feature that will allow facility managers to create an optional custom ID (customID) for their Agents. In the create Agent workflow, we will need update the backend and frontend to reflect this optional information.

customID should be unique.

Backend should add one additional optional value into Agents database. INT data type.

Frontend should add one additional field for customID input. INT data type.

**Acceptance Criteria**

- prevent user from writing if customID is not an INT or customID is not unique

**Estimated**

30 hours
