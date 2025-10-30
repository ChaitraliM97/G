"use client";

import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Header } from '@/components/Header';
import { FileUpload } from '@/components/FileUpload';
import { Dashboard } from '@/components/Dashboard';

export type DataRow = {
  [key: string]: string | number;
};

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file: File) => {
    setLoading(true);
    setError(null);
    setFileName(file.name);

    if (file.type === 'text/csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data as DataRow[]);
          setLoading(false);
        },
        error: (err) => {
          setError('Error parsing CSV file.');
          setLoading(false);
        },
      });
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;
        if (fileContent) {
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setData(json as DataRow[]);
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Error reading Excel file.');
        setLoading(false);
      };
      reader.readAsBinaryString(file);
    } else {
      setError('Unsupported file type. Please upload a CSV or XLSX file.');
      setLoading(false);
    }
  };

  const resetDashboard = () => {
    setData([]);
    setFileName(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        {data.length === 0 ? (
          <FileUpload onFileUpload={handleFileUpload} error={error} loading={loading} />
        ) : (
          <Dashboard data={data} fileName={fileName} onReset={resetDashboard} />
        )}
      </div>
    </main>
  );
}
