import { Component, ViewEncapsulation, OnInit ,Input} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { MilitaryTimeConversionPipe } from 'src/app/pipes/military-time-conversion.pipe';

@Component({
  selector: 'app-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers:[MilitaryTimeConversionPipe]
})
export class ChartComponent implements OnInit {
    @Input() chartdata: string[];
    
    private width: number;
    private height: number;
    private margin = {top: 20, right: 20, bottom: 30, left: 40};

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    constructor(private MilitaryTime:MilitaryTimeConversionPipe) {
    }

    ngOnInit() {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }

    private initSvg() {
        this.svg = d3.select('svg');
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.3);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.chartdata.map((d) => this.MilitaryTime.transform(d['time'])));
        this.y.domain([0, d3Array.max(this.chartdata, (d) => d['tempC'])]);
    }

    private drawAxis() {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
            this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))       
    }

    private drawBars() {
        this.g.selectAll('.bar')
            .data(this.chartdata)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => this.x(this.MilitaryTime.transform(d['time'])))
            .attr('y', (d) => this.y(d['tempC']) )
            .attr('width', this.x.bandwidth())
            .attr('height', (d) => this.height - this.y(d['tempC']) );
    }

      ngOnChanges() {
        d3.select('svg').selectAll('*').remove();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }
}
